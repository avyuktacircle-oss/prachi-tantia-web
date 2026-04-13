"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = "compose" | "schedule" | "history";
type SendState = "idle" | "sending" | "done" | "error";
type ScheduleSaveState = "idle" | "saving" | "saved" | "error";

type Broadcast = {
  id: string;
  subject: string;
  sentAt: string;
  recipientCount: number;
  failedCount: number;
};

type Subscriber = {
  id: string;
  email: string;
  subscribedAt: string;
};

type Stats = {
  activeSubscribers: number;
  subscribers: Subscriber[];
  broadcasts: Broadcast[];
};

type ScheduleSettings = {
  day: number;
  hour: number;
  minute: number;
  ampm: "AM" | "PM";
  timezone: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const TIMEZONES = [
  { label: "IST — India Standard Time (UTC+5:30)", value: "Asia/Kolkata" },
  { label: "UTC — Coordinated Universal Time", value: "UTC" },
  { label: "EST — US Eastern (UTC-5)", value: "America/New_York" },
  { label: "PST — US Pacific (UTC-8)", value: "America/Los_Angeles" },
  { label: "CST — US Central (UTC-6)", value: "America/Chicago" },
  { label: "MST — US Mountain (UTC-7)", value: "America/Denver" },
  { label: "BST — UK / Ireland (UTC+1)", value: "Europe/London" },
  { label: "CET — Central Europe (UTC+1)", value: "Europe/Paris" },
  { label: "GST — Gulf Standard (UTC+4)", value: "Asia/Dubai" },
  { label: "SGT — Singapore (UTC+8)", value: "Asia/Singapore" },
  { label: "AEST — Australia Eastern (UTC+10)", value: "Australia/Sydney" },
];

// ─── Rich-text toolbar ────────────────────────────────────────────────────────
function execCmd(cmd: string, value?: string) {
  document.execCommand(cmd, false, value);
}

function Toolbar() {
  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-white/10 bg-white/5">
      {[
        { label: "B", cmd: "bold", title: "Bold", style: "font-bold" },
        { label: "I", cmd: "italic", title: "Italic", style: "italic" },
        { label: "U", cmd: "underline", title: "Underline", style: "underline" },
      ].map(({ label, cmd, title, style }) => (
        <button
          key={cmd}
          type="button"
          title={title}
          onMouseDown={(e) => { e.preventDefault(); execCmd(cmd); }}
          className={`w-8 h-8 text-sm ${style} text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors`}
        >
          {label}
        </button>
      ))}
      <div className="w-px bg-white/10 mx-1" />
      {[
        { label: "H2", cmd: "formatBlock", value: "h2", title: "Heading" },
        { label: "¶", cmd: "formatBlock", value: "p", title: "Paragraph" },
      ].map(({ label, cmd, value, title }) => (
        <button
          key={label}
          type="button"
          title={title}
          onMouseDown={(e) => { e.preventDefault(); execCmd(cmd, value); }}
          className="px-2 h-8 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
        >
          {label}
        </button>
      ))}
      <div className="w-px bg-white/10 mx-1" />
      <button
        type="button"
        title="Bullet list"
        onMouseDown={(e) => { e.preventDefault(); execCmd("insertUnorderedList"); }}
        className="px-2 h-8 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
      >
        • List
      </button>
    </div>
  );
}

// ─── Shared editor markup (rendered inline to avoid ref/re-render issues) ─────
function editorMarkup(
  ref: React.MutableRefObject<HTMLDivElement | null>,
  onInput: () => void,
) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[2px] text-white/40 mb-2">
        Email Body
      </label>
      <div className="border border-white/10 rounded-lg overflow-hidden">
        <Toolbar />
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          onInput={onInput}
          className="min-h-[280px] p-5 text-white/90 focus:outline-none prose prose-invert prose-sm max-w-none"
          style={{ lineHeight: "1.9" }}
          data-placeholder="Write your note here…"
        />
      </div>
      <p className="text-xs text-white/30 mt-2">
        Prachi's signature and unsubscribe link are added automatically.
      </p>
    </div>
  );
}

// ─── Password gate ────────────────────────────────────────────────────────────
function PasswordGate({ onAuth }: { onAuth: (secret: string) => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  function attempt(e: React.FormEvent) {
    e.preventDefault();
    if (pw.trim()) { onAuth(pw.trim()); } else { setError(true); }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="text-xs tracking-[3px] uppercase text-[#EABB58] text-center mb-2">Avyukta Circle</p>
        <h1 className="text-2xl font-bold text-white text-center mb-8">Newsletter Admin</h1>
        <form onSubmit={attempt} className="space-y-4">
          <input
            type="password"
            placeholder="Enter admin password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false); }}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#EABB58]"
          />
          {error && <p className="text-red-400 text-sm">Please enter the password.</p>}
          <button
            type="submit"
            className="w-full bg-[#EABB58] text-[#0a0a0a] font-bold uppercase tracking-wide py-3 rounded-lg hover:bg-[#E5AB30] transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  );
}

// ─── Main CMS ─────────────────────────────────────────────────────────────────
function CmsApp({ secret }: { secret: string }) {
  const [tab, setTab] = useState<Tab>("compose");
  const [authError, setAuthError] = useState(false);

  // Stats
  const [stats, setStats] = useState<Stats | null>(null);
  const [statsError, setStatsError] = useState(false);
  const [showSubscribers, setShowSubscribers] = useState(false);

  // Compose tab state
  const [composeSubject, setComposeSubject] = useState("");
  const [composeHasBody, setComposeHasBody] = useState(false);
  const [sendState, setSendState] = useState<SendState>("idle");
  const [sendResult, setSendResult] = useState<{ sent: number; failed: number } | null>(null);
  const composeEditorRef = useRef<HTMLDivElement | null>(null);

  // Schedule tab state
  const [schedSubject, setSchedSubject] = useState("");
  const [schedHasBody, setSchedHasBody] = useState(false);
  const [scheduleSaveState, setScheduleSaveState] = useState<ScheduleSaveState>("idle");
  const [scheduleSettings, setScheduleSettings] = useState<ScheduleSettings>({
    day: 1,
    hour: 6,
    minute: 0,
    ampm: "AM",
    timezone: "Asia/Kolkata",
  });
  const [savedScheduleLabel, setSavedScheduleLabel] = useState<string | null>(null);
  const schedEditorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchStats();
    fetchDraft();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchStats() {
    try {
      const res = await fetch("/api/newsletter/stats", {
        headers: { "x-admin-secret": secret },
      });
      if (res.status === 401) { setAuthError(true); return; }
      const data = await res.json() as Stats & { ok: boolean };
      if (data.ok) setStats(data);
    } catch { setStatsError(true); }
  }

  async function fetchDraft() {
    try {
      const res = await fetch("/api/newsletter/draft", {
        headers: { "x-admin-secret": secret },
      });
      if (!res.ok) return;
      const data = await res.json() as {
        ok: boolean;
        draft: {
          subject: string;
          bodyHtml: string;
          schedule: ScheduleSettings | null;
        } | null;
      };
      if (data.ok && data.draft) {
        setSchedSubject(data.draft.subject);
        if (schedEditorRef.current) {
          schedEditorRef.current.innerHTML = data.draft.bodyHtml;
          setSchedHasBody(true);
        }
        if (data.draft.schedule) {
          setScheduleSettings(data.draft.schedule);
          setSavedScheduleLabel(formatScheduleLabel(data.draft.schedule));
        }
      }
    } catch { /* non-critical */ }
  }

  function formatScheduleLabel(s: ScheduleSettings): string {
    const day = DAYS[s.day] ?? "?";
    const h = s.hour === 0 ? 12 : s.hour > 12 ? s.hour - 12 : s.hour;
    const m = String(s.minute).padStart(2, "0");
    const tz = TIMEZONES.find((t) => t.value === s.timezone)?.label.split("—")[0]?.trim() ?? s.timezone;
    return `${day}s at ${h}:${m} ${s.ampm} ${tz}`;
  }

  // Convert 12h ampm → 24h
  function to24h(hour: number, ampm: "AM" | "PM"): number {
    if (ampm === "AM") return hour === 12 ? 0 : hour;
    return hour === 12 ? 12 : hour + 12;
  }

  async function handleSend() {
    const bodyHtml = composeEditorRef.current?.innerHTML?.trim() ?? "";
    if (!composeSubject.trim() || !bodyHtml) return;
    setSendState("sending");
    setSendResult(null);
    try {
      const res = await fetch("/api/newsletter/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-secret": secret },
        body: JSON.stringify({ subject: composeSubject.trim(), bodyHtml }),
      });
      if (res.status === 401) { setAuthError(true); return; }
      const data = await res.json() as { ok: boolean; sent: number; failed: number };
      if (data.ok) {
        setSendState("done");
        setSendResult({ sent: data.sent, failed: data.failed });
        setComposeSubject("");
        if (composeEditorRef.current) composeEditorRef.current.innerHTML = "";
        setComposeHasBody(false);
        await fetchStats();
      } else {
        setSendState("error");
      }
    } catch { setSendState("error"); }
  }

  async function handleSaveSchedule() {
    const bodyHtml = schedEditorRef.current?.innerHTML?.trim() ?? "";
    if (!schedSubject.trim() || !bodyHtml) return;
    setScheduleSaveState("saving");

    const hour24 = to24h(scheduleSettings.hour, scheduleSettings.ampm);
    const schedPayload = { ...scheduleSettings, hour: hour24 };

    // 1. Save draft — this is the critical step
    try {
      const draftRes = await fetch("/api/newsletter/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-secret": secret },
        body: JSON.stringify({ subject: schedSubject.trim(), bodyHtml, schedule: schedPayload }),
      });
      if (draftRes.status === 401) { setAuthError(true); return; }
      if (!draftRes.ok) throw new Error("draft save failed");
    } catch {
      setScheduleSaveState("error");
      return;
    }

    // 2. Update Cloud Scheduler — best-effort, does not block success
    try {
      await fetch("/api/newsletter/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-secret": secret },
        body: JSON.stringify({
          day: schedPayload.day,
          hour: schedPayload.hour,
          minute: schedPayload.minute,
          timezone: schedPayload.timezone,
        }),
      });
    } catch {
      console.warn("[cms] Cloud Scheduler update failed — draft is saved and will still send");
    }

    setSavedScheduleLabel(formatScheduleLabel(scheduleSettings));
    setScheduleSaveState("saved");
  }

  if (authError) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-red-400 text-lg font-bold mb-2">Incorrect password</p>
          <p className="text-white/50 text-sm">Please refresh and try again.</p>
        </div>
      </main>
    );
  }

  const canSend = composeSubject.trim().length > 0 && composeHasBody && sendState !== "sending";
  const canSchedule = schedSubject.trim().length > 0 && schedHasBody && scheduleSaveState !== "saving";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[3px] uppercase text-[#EABB58] mb-1">Avyukta Circle</p>
            <h1 className="text-xl font-bold text-white">Newsletter</h1>
          </div>
          <button
            onClick={() => setShowSubscribers((v) => !v)}
            className="text-right hover:opacity-80 transition-opacity"
            title="View subscriber list"
          >
            <p className="text-3xl font-bold text-[#EABB58]">
              {stats ? stats.activeSubscribers : statsError ? "?" : "—"}
            </p>
            <p className="text-xs text-white/40 uppercase tracking-wide">
              Active subscribers {stats ? (showSubscribers ? "▲" : "▼") : ""}
            </p>
          </button>
        </div>
      </div>

      {/* Subscriber list panel */}
      {showSubscribers && stats && (
        <div className="border-b border-white/10 bg-white/[0.02] px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-[2px] text-white/40">
                {stats.activeSubscribers} active subscriber{stats.activeSubscribers !== 1 ? "s" : ""}
              </p>
              <button
                onClick={() => setShowSubscribers(false)}
                className="text-white/30 hover:text-white/60 text-xs transition-colors"
              >
                Close ✕
              </button>
            </div>
            {stats.subscribers.length === 0 ? (
              <p className="text-white/30 text-sm">No subscribers yet.</p>
            ) : (
              <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
                {stats.subscribers.map((s) => (
                  <div key={s.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <p className="text-sm text-white/80 truncate">{s.email}</p>
                    <p className="text-xs text-white/30 shrink-0 ml-4">
                      {new Date(s.subscribedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-white/10 px-6">
        <div className="max-w-3xl mx-auto flex gap-6">
          {(["compose", "schedule", "history"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-4 text-sm font-bold uppercase tracking-wide border-b-2 transition-colors ${
                tab === t
                  ? "border-[#EABB58] text-[#EABB58]"
                  : "border-transparent text-white/40 hover:text-white/70"
              }`}
            >
              {t === "compose" ? "Send Now" : t === "schedule" ? "Schedule" : "History"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* ── Compose / Send Now Tab ── */}
        {tab === "compose" && (
          <div className="space-y-6">
            {sendState === "done" && sendResult && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-5 py-4">
                <p className="text-green-400 font-bold text-lg">
                  ✓ Sent to {sendResult.sent} subscriber{sendResult.sent !== 1 ? "s" : ""}
                  {sendResult.failed > 0 && (
                    <span className="text-yellow-400 font-normal text-sm ml-2">
                      ({sendResult.failed} failed)
                    </span>
                  )}
                </p>
                <p className="text-white/50 text-sm mt-1">Your note is on its way.</p>
                <button
                  onClick={() => { setSendState("idle"); setSendResult(null); }}
                  className="mt-3 text-sm text-[#EABB58] underline"
                >
                  Write another note
                </button>
              </div>
            )}

            {sendState === "error" && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-5 py-4">
                <p className="text-red-400 font-bold">Something went wrong. Please try again.</p>
                <button onClick={() => setSendState("idle")} className="mt-2 text-sm text-[#EABB58] underline">
                  Try again
                </button>
              </div>
            )}

            {sendState !== "done" && (
              <>
                <div>
                  <label className="block text-xs uppercase tracking-[2px] text-white/40 mb-2">Subject Line</label>
                  <input
                    type="text"
                    value={composeSubject}
                    onChange={(e) => setComposeSubject(e.target.value)}
                    placeholder="This week: …"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#EABB58] text-base"
                  />
                </div>

                {editorMarkup(composeEditorRef, () => setComposeHasBody(!!composeEditorRef.current?.innerText?.trim()))}

                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={handleSend}
                    disabled={!canSend}
                    className="px-8 py-4 bg-[#EABB58] text-[#0a0a0a] font-bold uppercase tracking-wide rounded-lg hover:bg-[#E5AB30] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                  >
                    {sendState === "sending"
                      ? "Sending…"
                      : `Send to ${stats ? stats.activeSubscribers : "all"} subscribers`}
                  </button>
                  {sendState === "sending" && (
                    <div className="w-5 h-5 border-2 border-[#EABB58] border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Schedule Tab ── */}
        {tab === "schedule" && (
          <div className="space-y-6">
            {savedScheduleLabel && scheduleSaveState !== "saved" && (
              <div className="bg-white/5 border border-white/10 rounded-lg px-5 py-4">
                <p className="text-xs uppercase tracking-[2px] text-[#EABB58] mb-1">Currently scheduled</p>
                <p className="text-white font-semibold">{savedScheduleLabel}</p>
                <p className="text-white/40 text-xs mt-1">Update below and save to change.</p>
              </div>
            )}

            {scheduleSaveState === "saved" && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-5 py-4">
                <p className="text-green-400 font-bold">
                  ✓ Scheduled — {savedScheduleLabel}
                </p>
                <p className="text-white/50 text-sm mt-1">
                  Your note will be sent automatically at this time.
                </p>
                <button
                  onClick={() => setScheduleSaveState("idle")}
                  className="mt-3 text-sm text-[#EABB58] underline"
                >
                  Edit schedule
                </button>
              </div>
            )}

            {scheduleSaveState === "error" && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-5 py-4">
                <p className="text-red-400 font-bold">Failed to save schedule. Please try again.</p>
                <button onClick={() => setScheduleSaveState("idle")} className="mt-2 text-sm text-[#EABB58] underline">
                  Try again
                </button>
              </div>
            )}

            {scheduleSaveState !== "saved" && (
              <>
                {/* Schedule picker */}
                <div>
                  <p className="text-xs uppercase tracking-[2px] text-white/40 mb-3">Send Schedule</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Day */}
                    <div>
                      <label className="block text-xs text-white/40 mb-1">Day of week</label>
                      <select
                        value={scheduleSettings.day}
                        onChange={(e) => setScheduleSettings((s) => ({ ...s, day: Number(e.target.value) }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#EABB58] text-sm"
                      >
                        {DAYS.map((d, i) => (
                          <option key={d} value={i} className="bg-[#1a1a1a]">{d}</option>
                        ))}
                      </select>
                    </div>

                    {/* Timezone */}
                    <div>
                      <label className="block text-xs text-white/40 mb-1">Timezone</label>
                      <select
                        value={scheduleSettings.timezone}
                        onChange={(e) => setScheduleSettings((s) => ({ ...s, timezone: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#EABB58] text-sm"
                      >
                        {TIMEZONES.map((tz) => (
                          <option key={tz.value} value={tz.value} className="bg-[#1a1a1a]">{tz.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Hour */}
                    <div>
                      <label className="block text-xs text-white/40 mb-1">Hour</label>
                      <select
                        value={scheduleSettings.hour}
                        onChange={(e) => setScheduleSettings((s) => ({ ...s, hour: Number(e.target.value) }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#EABB58] text-sm"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                          <option key={h} value={h} className="bg-[#1a1a1a]">{String(h).padStart(2, "0")}</option>
                        ))}
                      </select>
                    </div>

                    {/* Minute + AM/PM */}
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="block text-xs text-white/40 mb-1">Minute</label>
                        <select
                          value={scheduleSettings.minute}
                          onChange={(e) => setScheduleSettings((s) => ({ ...s, minute: Number(e.target.value) }))}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#EABB58] text-sm"
                        >
                          {[0, 15, 30, 45].map((m) => (
                            <option key={m} value={m} className="bg-[#1a1a1a]">{String(m).padStart(2, "0")}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs text-white/40 mb-1">AM / PM</label>
                        <select
                          value={scheduleSettings.ampm}
                          onChange={(e) => setScheduleSettings((s) => ({ ...s, ampm: e.target.value as "AM" | "PM" }))}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-[#EABB58] text-sm"
                        >
                          <option value="AM" className="bg-[#1a1a1a]">AM</option>
                          <option value="PM" className="bg-[#1a1a1a]">PM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-white/30 mt-3">
                    Preview:{" "}
                    <span className="text-white/60">
                      {formatScheduleLabel(scheduleSettings)}
                    </span>
                  </p>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10" />

                {/* Subject */}
                <div>
                  <label className="block text-xs uppercase tracking-[2px] text-white/40 mb-2">Subject Line</label>
                  <input
                    type="text"
                    value={schedSubject}
                    onChange={(e) => setSchedSubject(e.target.value)}
                    placeholder="This week: …"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#EABB58] text-base"
                  />
                </div>

                {editorMarkup(schedEditorRef, () => setSchedHasBody(!!schedEditorRef.current?.innerText?.trim()))}

                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={handleSaveSchedule}
                    disabled={!canSchedule}
                    className="px-8 py-4 bg-[#EABB58] text-[#0a0a0a] font-bold uppercase tracking-wide rounded-lg hover:bg-[#E5AB30] transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                  >
                    {scheduleSaveState === "saving" ? "Saving…" : "Save & Schedule"}
                  </button>
                  {scheduleSaveState === "saving" && (
                    <div className="w-5 h-5 border-2 border-[#EABB58] border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── History Tab ── */}
        {tab === "history" && (
          <div>
            {statsError && (
              <p className="text-red-400 text-sm">Could not load history. Please refresh.</p>
            )}
            {!stats && !statsError && (
              <div className="flex items-center gap-3 text-white/40 text-sm">
                <div className="w-4 h-4 border-2 border-white/20 border-t-transparent rounded-full animate-spin" />
                Loading…
              </div>
            )}
            {stats && stats.broadcasts.length === 0 && (
              <p className="text-white/40 text-sm">No broadcasts sent yet.</p>
            )}
            {stats && stats.broadcasts.length > 0 && (
              <div className="space-y-3">
                {stats.broadcasts.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white/5 border border-white/10 rounded-lg px-5 py-4 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-white truncate">{b.subject}</p>
                      <p className="text-xs text-white/40 mt-1">
                        {new Date(b.sentAt).toLocaleDateString("en-IN", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[#EABB58] font-bold">{b.recipientCount}</p>
                      <p className="text-xs text-white/40">sent</p>
                      {b.failedCount > 0 && (
                        <p className="text-xs text-red-400">{b.failedCount} failed</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );

  function formatScheduleLabel(s: ScheduleSettings): string {
    const day = DAYS[s.day] ?? "?";
    const h = s.hour === 0 ? 12 : s.hour > 12 ? s.hour - 12 : s.hour;
    const m = String(s.minute).padStart(2, "0");
    const tz = TIMEZONES.find((t) => t.value === s.timezone)?.label.split("—")[0]?.trim() ?? s.timezone;
    return `${day}s at ${h}:${m} ${s.ampm} ${tz}`;
  }
}

// ─── Page root ────────────────────────────────────────────────────────────────
export default function AdminNewsletterPage() {
  const [secret, setSecret] = useState<string | null>(null);
  if (!secret) return <PasswordGate onAuth={setSecret} />;
  return <CmsApp secret={secret} />;
}
