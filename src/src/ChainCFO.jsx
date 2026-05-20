import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis } from "recharts";

const G = {
  gold: "#D4AF37", goldLight: "#F5D060", goldDim: "#8B6914",
  bg: "#0C0A14", card: "#13101F", cardGold: "#171208",
  border: "#2A2418", borderGold: "#3A2E10",
  text: "#EDE8D0", muted: "#5A5040", green: "#4ADE80", red: "#F87171",
};

const SPLIT = [
  { name: "Operating",   pct: 40, color: "#F5D060", amount: 41948 },
  { name: "Yield Vault", pct: 30, color: "#C084FC", amount: 31461 },
  { name: "Payroll",     pct: 20, color: "#67E8F9", amount: 20974 },
  { name: "Tax Reserve", pct: 10, color: "#FCA5A5", amount: 10487 },
];

const TXNS = [
  { type: "INCOMING", label: "Revenue received",         amt: "+12,400", token: "USDC", time: "2m ago", color: "#4ADE80" },
  { type: "SPLIT",    label: "Auto-allocation executed", amt: "4 vaults", token: "",     time: "2m ago", color: "#D4AF37" },
  { type: "YIELD",    label: "Aave deposit",             amt: "+3,720",  token: "USDC", time: "2m ago", color: "#C084FC" },
  { type: "PAYROLL",  label: "Stream to 4 wallets",      amt: "−2,480",  token: "USDC", time: "3m ago", color: "#67E8F9" },
  { type: "TAX",      label: "Reserve locked",           amt: "+1,240",  token: "USDC", time: "3m ago", color: "#FCA5A5" },
  { type: "INCOMING", label: "Client payment",           amt: "+8,200",  token: "ETH",  time: "1h ago", color: "#4ADE80" },
];

const YIELD_DATA = [
  { m: "Jan", v: 1200 }, { m: "Feb", v: 1850 }, { m: "Mar", v: 1500 },
  { m: "Apr", v: 2300 }, { m: "May", v: 2100 }, { m: "Jun", v: 2900 },
];

const STEPS = [
  { n: "01", title: "Income Detection",  sub: "USDC / ETH / ERC-20",  done: true  },
  { n: "02", title: "AI Split Engine",   sub: "40 · 30 · 20 · 10 %",  done: true  },
  { n: "03", title: "Yield Deployment",  sub: "Aave → 8.2% APY",      done: true  },
  { n: "04", title: "Payroll Stream",    sub: "Real-time · 4 wallets", done: true  },
  { n: "05", title: "Autopay Bills",     sub: "Recurring vendors",     done: false },
  { n: "06", title: "On-chain Report",   sub: "Minted weekly",         done: false },
];

function useCount(target) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let n = 0, step = target / 90;
    const t = setInterval(() => { n = Math.min(n + step, target); setV(Math.floor(n)); if (n >= target) clearInterval(t); }, 16);
    return () => clearInterval(t);
  }, [target]);
  return v;
}

const fmt = (n) => "$" + Number(n).toLocaleString();

const Card = ({ children, style = {}, gold = false }) => (
  <div style={{ background: gold ? G.cardGold : G.card, border: `1px solid ${gold ? G.borderGold : G.border}`, borderRadius: 14, padding: 16, ...style }}>
    {children}
  </div>
);

const Lbl = ({ c }) => (
  <div style={{ fontSize: ".55rem", letterSpacing: ".18em", textTransform: "uppercase", color: G.muted, fontFamily: "monospace", marginBottom: 7 }}>{c}</div>
);

const GoldNum = ({ children, size = "1.6rem" }) => (
  <span style={{ fontSize: size, fontWeight: 800, background: "linear-gradient(135deg,#F5D060,#D4AF37,#8B6914)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "Georgia,serif" }}>
    {children}
  </span>
);

const Pill = ({ children, color }) => (
  <span style={{ padding: "2px 7px", borderRadius: 999, background: color + "22", border: `1px solid ${color}44`, color, fontSize: ".56rem", fontFamily: "monospace", whiteSpace: "nowrap" }}>
    {children}
  </span>
);

const Dot = ({ color = "#4ADE80", size = 7 }) => (
  <span style={{ display: "inline-block", width: size, height: size, borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}`, animation: "blink 2s infinite", flexShrink: 0 }} />
);

const Tip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: G.card, border: `1px solid ${G.borderGold}`, borderRadius: 9, padding: "6px 11px" }}>
      <div style={{ color: G.muted, fontSize: ".62rem" }}>{payload[0].payload.m}</div>
      <div style={{ color: "#F5D060", fontFamily: "monospace", fontWeight: 700 }}>{fmt(payload[0].value)}</div>
    </div>
  );
};

export default function ChainCFO() {
  const total = useCount(104870);
  const yld   = useCount(2580);

  return (
    <div style={{ backgroundColor: G.bg, minHeight: "100vh", color: G.text, fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
      <style>{`
        html, body { background: #0C0A14 !important; margin: 0; padding: 0; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
        .grid2b { display: grid; grid-template-columns: 1.3fr 1fr; gap: 10px; }
        @media(max-width:600px) {
          .grid2  { grid-template-columns: 1fr 1fr; }
          .grid3  { grid-template-columns: 1fr 1fr; }
          .grid2b { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ padding: "18px 14px" }}>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: "#1A1408", border: `1px solid ${G.borderGold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>₿</div>
            <div>
              <div style={{ fontSize: "1.4rem", fontWeight: 900, letterSpacing: "-.03em" }}>
                <span style={{ color: "#fff" }}>Chain</span><GoldNum size="1.4rem">CFO</GoldNum>
              </div>
              <div style={{ fontSize: ".52rem", color: G.muted, letterSpacing: ".14em", textTransform: "uppercase" }}>Autonomous On-Chain Financial OS</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            <Card style={{ padding: "6px 12px", display: "flex", gap: 6, alignItems: "center" }}>
              <Dot /><span style={{ color: G.green, fontSize: ".62rem", fontFamily: "monospace" }}>Live · ETH</span>
            </Card>
            <Card gold style={{ padding: "6px 12px" }}>
              <span style={{ fontSize: ".62rem" }}>By <b style={{ color: G.gold }}>W3.io</b></span>
            </Card>
          </div>
        </div>

        {/* TOP STATS — 2x2 grid */}
        <div className="grid2" style={{ marginBottom: 12 }}>
          {[
            { l: "Total Inflow (MTD)", v: fmt(total),  s: "+12.3%", gold: true },
            { l: "Yield Earned",       v: fmt(yld),    s: "8.2% APY · Aave" },
            { l: "Payroll Streamed",   v: "$20,974",   s: "4 recipients" },
            { l: "Tax Reserved",       v: "$10,487",   s: "Q2 2026" },
          ].map((s, i) => (
            <Card key={i} gold={!!s.gold}>
              <Lbl c={s.l} />
              <GoldNum size="1.25rem">{s.v}</GoldNum>
              <div style={{ color: G.muted, fontSize: ".58rem", marginTop: 4 }}>{s.s}</div>
            </Card>
          ))}
        </div>

        {/* BALANCE + RUNWAY — full width */}
        <Card gold style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
            <div>
              <Lbl c="Total Treasury Balance" />
              <GoldNum size="2.2rem">{fmt(104870)}</GoldNum>
              <div style={{ color: G.muted, fontSize: ".6rem", marginTop: 3 }}>USDC · Across 4 vaults</div>
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <Lbl c="Treasury Runway" />
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: ".54rem", color: G.muted, fontFamily: "monospace" }}>0M</span>
                <span style={{ fontSize: ".54rem", color: G.muted, fontFamily: "monospace" }}>24M</span>
              </div>
              <div style={{ height: 5, background: "#1A1810", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "58%", background: "linear-gradient(90deg,#6B4F10,#F5D060)", borderRadius: 4, boxShadow: "0 0 8px rgba(212,175,55,.5)" }} />
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 8 }}>
                <GoldNum size="1.6rem">14</GoldNum>
                <span style={{ color: G.muted, fontSize: ".65rem" }}>months</span>
                <span style={{ marginLeft: "auto", color: G.green, fontSize: ".58rem", fontFamily: "monospace" }}>✓ Healthy</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12, padding: "9px 12px", background: "#0F0C04", border: `1px solid ${G.borderGold}`, borderRadius: 9 }}>
            <div style={{ fontSize: ".58rem", color: G.gold, lineHeight: 1.7 }}>
              🤖 <b>AI Advisory</b> · Runway healthy. Yield optimal. Rebalance in <b style={{ color: "#F5D060" }}>3 days</b>.
            </div>
          </div>
        </Card>

        {/* DONUT + YIELD CHART — 2 col */}
        <div className="grid2" style={{ marginBottom: 12 }}>

          <Card>
            <Lbl c="Auto-Split Engine" />
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={SPLIT} cx="50%" cy="50%" innerRadius={38} outerRadius={60} paddingAngle={4} dataKey="pct">
                  {SPLIT.map((s, i) => <Cell key={i} fill={s.color} stroke={s.color + "22"} strokeWidth={1} />)}
                </Pie>
                <Tooltip content={({ active, payload }) => active && payload?.length ? (
                  <div style={{ background: G.card, border: `1px solid ${G.borderGold}`, borderRadius: 9, padding: "6px 10px" }}>
                    <div style={{ color: payload[0].payload.color, fontFamily: "monospace", fontWeight: 700, fontSize: ".7rem" }}>{payload[0].name} {payload[0].value}%</div>
                  </div>
                ) : null} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {SPLIT.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 14, height: 3, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                  <span style={{ fontSize: ".62rem", color: G.text, flex: 1 }}>{s.name}</span>
                  <span style={{ fontSize: ".6rem", color: s.color, fontFamily: "monospace" }}>{s.pct}%</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Lbl c="Yield Vault" />
              <Pill color="#C084FC">8.2% APY</Pill>
            </div>
            <ResponsiveContainer width="100%" height={130}>
              <AreaChart data={YIELD_DATA} margin={{ top: 5, right: 2, left: -32, bottom: 0 }}>
                <defs>
                  <linearGradient id="yg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={G.gold} stopOpacity={.4} />
                    <stop offset="95%" stopColor={G.gold} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="m" tick={{ fill: G.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: G.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
                <Area type="monotone" dataKey="v" stroke={G.gold} strokeWidth={2} fill="url(#yg)" dot={false} />
                <Tooltip content={<Tip />} />
              </AreaChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 7, marginTop: 8 }}>
              <div style={{ flex: 1, padding: "7px 9px", background: "#0F0C04", border: `1px solid ${G.borderGold}`, borderRadius: 8 }}>
                <div style={{ color: G.muted, fontSize: ".5rem", marginBottom: 2 }}>THIS MONTH</div>
                <GoldNum size=".82rem">$2,900</GoldNum>
              </div>
              <div style={{ flex: 1, padding: "7px 9px", background: "#110D1A", border: "1px solid rgba(192,132,252,.2)", borderRadius: 8 }}>
                <div style={{ color: G.muted, fontSize: ".5rem", marginBottom: 2 }}>PROTOCOL</div>
                <span style={{ color: "#C084FC", fontWeight: 700, fontSize: ".82rem" }}>Aave v3</span>
              </div>
            </div>
          </Card>
        </div>

        {/* TRANSACTIONS — full width */}
        <Card style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <Lbl c="Live Transaction Feed" />
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Dot size={5} /><span style={{ color: G.green, fontSize: ".56rem", fontFamily: "monospace" }}>Auto-executing</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {TXNS.map((tx, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 9, background: "#0F0D18", border: `1px solid ${G.border}` }}>
                <Pill color={tx.color}>{tx.type}</Pill>
                <span style={{ flex: 1, fontSize: ".64rem", color: G.text }}>{tx.label}</span>
                <span style={{ fontFamily: "monospace", fontSize: ".65rem", fontWeight: 700, color: tx.amt.startsWith("+") ? G.green : tx.amt.startsWith("−") ? G.red : G.gold }}>
                  {tx.amt}
                </span>
                <span style={{ color: G.muted, fontSize: ".55rem" }}>{tx.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* W3.io RECIPE — full width */}
        <Card gold>
          <Lbl c="W3.io Composable Recipe" />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 11, alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: s.done ? "#1F1A08" : "#0F0D18", border: `1px solid ${s.done ? G.borderGold : G.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".62rem", fontFamily: "monospace", color: s.done ? "#F5D060" : G.muted, fontWeight: 700 }}>
                    {s.done ? "✓" : s.n}
                  </div>
                  {i < STEPS.length - 1 && <div style={{ width: 1, height: 10, background: s.done ? G.borderGold : G.border }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: ".68rem", fontWeight: 600, color: s.done ? G.text : G.muted }}>{s.title}</div>
                  <div style={{ fontSize: ".57rem", color: G.muted, fontFamily: "monospace" }}>{s.sub}</div>
                </div>
                {s.done && <Dot size={5} color={G.gold} />}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: "10px 12px", background: "#0F0C04", border: `1px solid ${G.borderGold}`, borderRadius: 10 }}>
            <div style={{ fontSize: ".6rem", color: G.gold, lineHeight: 1.8, fontFamily: "monospace" }}>
              ⚡ Concept → Deployment <b style={{ color: "#F5D060" }}>&lt; 1 day</b> · No integrations. No complexity.<br />
              <span style={{ color: G.muted }}>Built with AI · Powered by</span> <b style={{ color: "#F5D060" }}>W3.io</b> · <span style={{ color: G.muted }}>@w3arew3</span>
            </div>
          </div>
        </Card>

        {/* FOOTER */}
        <div style={{ textAlign: "center", marginTop: 22, color: G.muted, fontSize: ".53rem", fontFamily: "monospace", letterSpacing: ".13em" }}>
          CHAINCFO · VIBE CODED WITH AI · POWERED BY <span style={{ color: G.gold }}>W3.IO</span> · @w3arew3
        </div>
      </div>
    </div>
  );
}
