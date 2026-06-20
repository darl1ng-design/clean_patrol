import { useEffect, useState, type ReactNode } from 'react'

type Metric = {
  label: string
  value: string
  description: string
  trend: string
}

type Alert = {
  title: string
  description: string
  level: 'info' | 'warning' | 'success'
}

type RobotStatus = 'Aktywny' | 'W drodze' | 'Serwis'

type Robot = {
  id: string
  name: string
  model: string
  parkName: string
  address: string
  status: RobotStatus
  battery: number
  containerFill: number
  speed: string
  progress: number
  detectedDroppings: number
  collectedDroppings: number
  efficiency: number
  lastUpdate: string
  overviewX: string
  overviewY: string
  color: string
  svgFill: string
  textColor: string
  borderColor: string
  routeStroke: string
  routeSoftStroke: string
  glow: string
  routeD: string
}

const ROBOT_ROUTE_DURATION_SECONDS = 15 * 60

const robots: Robot[] = [
  {
    id: 'CP-01',
    name: 'Clean Patrol #01',
    model: 'Model A',
    parkName: 'Łazienki Królewskie',
    address: 'ul. Agrykola 1, Warszawa',
    status: 'Aktywny',
    battery: 78,
    containerFill: 54,
    speed: '3.4 km/h',
    progress: 100,
    detectedDroppings: 19,
    collectedDroppings: 18,
    efficiency: 96,
    lastUpdate: '14:32',
    overviewX: '55%',
    overviewY: '61%',
    color: 'bg-emerald-400',
    svgFill: '#34d399',
    textColor: 'text-emerald-300',
    borderColor: 'border-emerald-300/40',
    routeStroke: 'rgba(52, 211, 153, 0.75)',
    routeSoftStroke: 'rgba(52, 211, 153, 0.18)',
    glow: 'shadow-[0_0_35px_rgba(52,211,153,0.95)]',
    routeD:
        'M100 510 C185 410 255 365 350 350 C450 335 500 260 610 250 C735 238 795 170 895 125',
  },
  {
    id: 'CP-02',
    name: 'Clean Patrol #02',
    model: 'Model B',
    parkName: 'Park Skaryszewski',
    address: 'al. Zieleniecka, Warszawa',
    status: 'W drodze',
    battery: 64,
    containerFill: 61,
    speed: '2.9 km/h',
    progress: 100,
    detectedDroppings: 16,
    collectedDroppings: 13,
    efficiency: 89,
    lastUpdate: '14:31',
    overviewX: '68%',
    overviewY: '56%',
    color: 'bg-sky-400',
    svgFill: '#38bdf8',
    textColor: 'text-sky-300',
    borderColor: 'border-sky-300/40',
    routeStroke: 'rgba(56, 189, 248, 0.75)',
    routeSoftStroke: 'rgba(56, 189, 248, 0.18)',
    glow: 'shadow-[0_0_35px_rgba(56,189,248,0.95)]',
    routeD:
        'M90 390 C170 320 250 290 345 295 C440 300 500 230 610 225 C730 220 790 315 910 280',
  },
  {
    id: 'CP-03',
    name: 'Clean Patrol #03',
    model: 'Model C',
    parkName: 'Park Moczydło',
    address: 'ul. Górczewska, Warszawa',
    status: 'Aktywny',
    battery: 49,
    containerFill: 83,
    speed: '3.1 km/h',
    progress: 100,
    detectedDroppings: 22,
    collectedDroppings: 18,
    efficiency: 93,
    lastUpdate: '14:30',
    overviewX: '34%',
    overviewY: '45%',
    color: 'bg-amber-300',
    svgFill: '#fcd34d',
    textColor: 'text-amber-300',
    borderColor: 'border-amber-300/40',
    routeStroke: 'rgba(252, 211, 77, 0.78)',
    routeSoftStroke: 'rgba(252, 211, 77, 0.18)',
    glow: 'shadow-[0_0_35px_rgba(252,211,77,0.95)]',
    routeD:
        'M130 170 C240 105 365 120 445 195 C515 260 560 325 665 310 C760 296 820 230 900 175',
  },
  {
    id: 'CP-04',
    name: 'Clean Patrol #04',
    model: 'Model D',
    parkName: 'Pole Mokotowskie',
    address: 'Mokotów / Ochota, Warszawa',
    status: 'Aktywny',
    battery: 86,
    containerFill: 39,
    speed: '3.6 km/h',
    progress: 100,
    detectedDroppings: 14,
    collectedDroppings: 13,
    efficiency: 95,
    lastUpdate: '14:29',
    overviewX: '47%',
    overviewY: '58%',
    color: 'bg-violet-400',
    svgFill: '#a78bfa',
    textColor: 'text-violet-300',
    borderColor: 'border-violet-300/40',
    routeStroke: 'rgba(167, 139, 250, 0.78)',
    routeSoftStroke: 'rgba(167, 139, 250, 0.18)',
    glow: 'shadow-[0_0_35px_rgba(167,139,250,0.95)]',
    routeD:
        'M95 550 C195 470 270 425 370 435 C465 445 520 500 625 465 C740 425 770 340 900 350',
  },
  {
    id: 'CP-05',
    name: 'Clean Patrol #05',
    model: 'Model E',
    parkName: 'Park Praski',
    address: 'Praga-Północ, Warszawa',
    status: 'Serwis',
    battery: 38,
    containerFill: 72,
    speed: '0 km/h',
    progress: 0,
    detectedDroppings: 9,
    collectedDroppings: 7,
    efficiency: 84,
    lastUpdate: '14:21',
    overviewX: '64%',
    overviewY: '47%',
    color: 'bg-rose-400',
    svgFill: '#fb7185',
    textColor: 'text-rose-300',
    borderColor: 'border-rose-300/40',
    routeStroke: 'rgba(251, 113, 133, 0.75)',
    routeSoftStroke: 'rgba(251, 113, 133, 0.18)',
    glow: 'shadow-[0_0_35px_rgba(251,113,133,0.95)]',
    routeD:
        'M145 445 C220 375 280 315 370 305 C470 292 520 355 610 360 C715 365 760 300 885 255',
  },
  {
    id: 'CP-06',
    name: 'Clean Patrol #06',
    model: 'Model F',
    parkName: 'Park Szczęśliwicki',
    address: 'Ochota, Warszawa',
    status: 'Aktywny',
    battery: 71,
    containerFill: 46,
    speed: '3.2 km/h',
    progress: 100,
    detectedDroppings: 17,
    collectedDroppings: 15,
    efficiency: 91,
    lastUpdate: '14:28',
    overviewX: '39%',
    overviewY: '63%',
    color: 'bg-lime-300',
    svgFill: '#bef264',
    textColor: 'text-lime-300',
    borderColor: 'border-lime-300/40',
    routeStroke: 'rgba(190, 242, 100, 0.78)',
    routeSoftStroke: 'rgba(190, 242, 100, 0.18)',
    glow: 'shadow-[0_0_35px_rgba(190,242,100,0.95)]',
    routeD:
        'M115 280 C205 225 290 230 365 285 C440 350 525 405 625 385 C735 365 790 455 910 430',
  },
]

const activeRobots = robots.filter((robot) => robot.status !== 'Serwis').length

const maxDetected = robots
    .filter((robot) => robot.status !== 'Serwis')
    .reduce((sum, robot) => sum + robot.detectedDroppings, 0)

const maxCollected = robots
    .filter((robot) => robot.status !== 'Serwis')
    .reduce((sum, robot) => sum + robot.collectedDroppings, 0)

const maxAverageEfficiency = Math.round(
    robots
        .filter((robot) => robot.status !== 'Serwis')
        .reduce((sum, robot) => sum + robot.efficiency, 0) / activeRobots,
)

const alerts: Alert[] = [
  {
    title: 'CP-03 zbliża się do limitu zbiornika',
    description:
        'Zbiornik zapełnia się razem z postępem trasy. Po osiągnięciu wysokiego poziomu system zasugeruje opróżnienie.',
    level: 'warning',
  },
  {
    title: 'CP-05 w trybie serwisowym',
    description:
        'Robot jest wyłączony z ruchu, nie wykonuje trasy i nie zwiększa statystyk patrolu.',
    level: 'warning',
  },
  {
    title: 'Raport dzienny aktualizowany live',
    description:
        'Dane o wykryciach, zebranych odchodach i skuteczności rosną wraz z pracą robotów.',
    level: 'info',
  },
]

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)))
}

function getRouteCompletion(elapsedSeconds: number) {
  return clampPercent((elapsedSeconds / ROBOT_ROUTE_DURATION_SECONDS) * 100)
}

function getRobotLiveState(robot: Robot, elapsedSeconds: number) {
  if (robot.status === 'Serwis') {
    return {
      progress: 0,
      containerFill: 0,
      detectedDroppings: 0,
      collectedDroppings: 0,
      efficiency: 0,
    }
  }

  const progress = getRouteCompletion(elapsedSeconds)
  const progressRatio = progress / 100

  return {
    progress,
    containerFill: clampPercent(robot.containerFill * progressRatio),
    detectedDroppings: Math.floor(robot.detectedDroppings * progressRatio),
    collectedDroppings: Math.floor(robot.collectedDroppings * progressRatio),
    efficiency: clampPercent(robot.efficiency * progressRatio),
  }
}

function getFleetLiveTotals(elapsedSeconds: number) {
  return robots.reduce(
      (totals, robot) => {
        const liveState = getRobotLiveState(robot, elapsedSeconds)

        return {
          detectedDroppings:
              totals.detectedDroppings + liveState.detectedDroppings,
          collectedDroppings:
              totals.collectedDroppings + liveState.collectedDroppings,
        }
      },
      {
        detectedDroppings: 0,
        collectedDroppings: 0,
      },
  )
}

function useElapsedSeconds() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  useEffect(() => {
    const startedAt = Date.now()

    const intervalId = window.setInterval(() => {
      setElapsedSeconds((Date.now() - startedAt) / 1000)
    }, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  return elapsedSeconds
}

function Card({
                children,
                className = '',
              }: {
  children: ReactNode
  className?: string
}) {
  return (
      <div
          className={`rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur ${className}`}
      >
        {children}
      </div>
  )
}

function StatusBadge({ children }: { children: string }) {
  return (
      <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
      {children}
    </span>
  )
}

function getStatusStyle(status: RobotStatus) {
  if (status === 'Aktywny') return 'bg-emerald-400/10 text-emerald-300'
  if (status === 'W drodze') return 'bg-sky-400/10 text-sky-300'
  return 'bg-rose-400/10 text-rose-300'
}

function getAlertDot(level: Alert['level']) {
  if (level === 'warning') return 'bg-amber-300'
  if (level === 'success') return 'bg-emerald-300'
  return 'bg-sky-300'
}

function SatelliteBackground() {
  return (
      <>
        <div className="absolute inset-0 bg-[#07130f]" />

        <div className="absolute inset-0 opacity-90 [background-image:radial-gradient(circle_at_18%_22%,rgba(34,197,94,0.18),transparent_25%),radial-gradient(circle_at_76%_24%,rgba(132,204,22,0.15),transparent_28%),radial-gradient(circle_at_41%_72%,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_86%_76%,rgba(101,163,13,0.12),transparent_24%)]" />

        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:42px_42px]" />

        <svg
            className="absolute inset-0 h-full w-full opacity-70"
            viewBox="0 0 1000 720"
            fill="none"
        >
          <path
              d="M-40 180 C120 130 225 170 360 145 C510 118 590 75 740 120 C870 158 950 130 1040 80"
              stroke="rgba(30, 64, 175, 0.18)"
              strokeWidth="42"
              strokeLinecap="round"
          />

          <path
              d="M-40 620 C105 550 190 530 315 555 C455 583 545 635 690 600 C810 572 910 595 1040 545"
              stroke="rgba(30, 64, 175, 0.13)"
              strokeWidth="34"
              strokeLinecap="round"
          />

          <path
              d="M70 95 L920 640"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="10"
              strokeLinecap="round"
          />

          <path
              d="M125 610 L890 130"
              stroke="rgba(255,255,255,0.035)"
              strokeWidth="8"
              strokeLinecap="round"
          />

          <path
              d="M450 0 L530 720"
              stroke="rgba(255,255,255,0.035)"
              strokeWidth="14"
              strokeLinecap="round"
          />

          <path
              d="M0 390 L1000 345"
              stroke="rgba(255,255,255,0.035)"
              strokeWidth="12"
              strokeLinecap="round"
          />
        </svg>

        <div className="absolute left-[7%] top-[12%] h-32 w-72 rounded-[44px] bg-emerald-500/10 blur-[1px]" />
        <div className="absolute right-[8%] top-[16%] h-40 w-80 rounded-[54px] bg-lime-400/10 blur-[1px]" />
        <div className="absolute bottom-[11%] left-[12%] h-44 w-96 rounded-[60px] bg-emerald-400/10 blur-[1px]" />
        <div className="absolute bottom-[13%] right-[12%] h-36 w-80 rounded-[60px] bg-yellow-300/10 blur-[1px]" />
      </>
  )
}

function RobotMotion({
                       robot,
                       elapsedSeconds,
                     }: {
  robot: Robot
  elapsedSeconds: number
}) {
  if (robot.status === 'Serwis') {
    return null
  }

  const motionOffsetSeconds = Math.min(
      elapsedSeconds,
      ROBOT_ROUTE_DURATION_SECONDS,
  )

  return (
      <g>
        <circle r="30" fill={robot.svgFill} opacity="0.16">
          <animateMotion
              dur={`${ROBOT_ROUTE_DURATION_SECONDS}s`}
              begin={`-${motionOffsetSeconds}s`}
              repeatCount="1"
              fill="freeze"
              path={robot.routeD}
          />
        </circle>

        <circle r="14" fill={robot.svgFill}>
          <animateMotion
              dur={`${ROBOT_ROUTE_DURATION_SECONDS}s`}
              begin={`-${motionOffsetSeconds}s`}
              repeatCount="1"
              fill="freeze"
              path={robot.routeD}
          />
        </circle>

        <circle r="5" fill="white">
          <animateMotion
              dur={`${ROBOT_ROUTE_DURATION_SECONDS}s`}
              begin={`-${motionOffsetSeconds}s`}
              repeatCount="1"
              fill="freeze"
              path={robot.routeD}
          />
        </circle>
      </g>
  )
}

function OverviewMap({
                       selectedRobotId,
                       onSelectRobot,
                     }: {
  selectedRobotId: string | null
  onSelectRobot: (robotId: string) => void
}) {
  return (
      <div className="relative h-[720px] overflow-hidden rounded-3xl border border-white/10">
        <SatelliteBackground />

        <div className="absolute left-5 top-5 rounded-2xl border border-white/10 bg-black/55 px-4 py-3 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">
            Widok ogólny
          </p>

          <p className="mt-1 text-sm font-semibold">
            6 robotów jako punkty GPS
          </p>
        </div>

        {robots.map((robot) => {
          const isSelected = robot.id === selectedRobotId
          const isOffline = robot.status === 'Serwis'

          return (
              <button
                  key={robot.id}
                  onClick={() => onSelectRobot(robot.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 text-left"
                  style={{
                    left: robot.overviewX,
                    top: robot.overviewY,
                  }}
                  title={`${robot.id} - ${robot.parkName}`}
              >
            <span
                className={`block rounded-full ${robot.color} transition duration-300 ${
                    isSelected
                        ? `h-8 w-8 ${robot.glow} ring-8 ring-white/10`
                        : `h-5 w-5 ${robot.glow} hover:scale-125`
                } ${isOffline ? 'opacity-45 grayscale' : ''}`}
            />

                <span
                    className={`mt-3 block rounded-xl border bg-black/65 px-3 py-2 text-xs shadow-xl backdrop-blur transition ${
                        isSelected
                            ? `${robot.borderColor} opacity-100`
                            : 'border-white/10 opacity-80'
                    }`}
                >
              <span className="font-bold">{robot.id}</span>

              <span className="ml-2 text-zinc-400">
                {isOffline ? 'Serwis' : robot.parkName}
              </span>
            </span>
              </button>
          )
        })}

        <div className="absolute bottom-5 right-5 max-w-[390px] rounded-2xl border border-white/10 bg-black/70 p-4 shadow-xl backdrop-blur">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
            Instrukcja
          </p>

          <p className="mt-1 text-sm font-semibold">
            Kliknij kropkę albo kartę robota
          </p>

          <p className="mt-1 text-xs text-zinc-400">
            Mapa przejdzie wtedy do widoku przybliżonego z trasą wybranej
            jednostki. Robot w serwisie jest widoczny, ale wyłączony z ruchu.
          </p>
        </div>
      </div>
  )
}

function DetailMap({
                     robot,
                     elapsedSeconds,
                     onBack,
                   }: {
  robot: Robot
  elapsedSeconds: number
  onBack: () => void
}) {
  const isOffline = robot.status === 'Serwis'

  return (
      <div className="relative h-[720px] overflow-hidden rounded-3xl border border-white/10">
        <SatelliteBackground />

        <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 720"
            fill="none"
        >
          {!isOffline && (
              <>
                <path
                    d={robot.routeD}
                    stroke={robot.routeSoftStroke}
                    strokeWidth="52"
                    strokeLinecap="round"
                />

                <path
                    d={robot.routeD}
                    stroke={robot.routeStroke}
                    strokeWidth="14"
                    strokeLinecap="round"
                />

                <path
                    d={robot.routeD}
                    stroke="rgba(255,255,255,0.22)"
                    strokeWidth="2"
                    strokeDasharray="12 18"
                    strokeLinecap="round"
                />

                <RobotMotion robot={robot} elapsedSeconds={elapsedSeconds} />
              </>
          )}
        </svg>

        <button
            onClick={onBack}
            className="absolute left-5 top-5 rounded-2xl border border-white/10 bg-black/65 px-4 py-3 text-left backdrop-blur transition hover:bg-white/10"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
            Powrót
          </p>

          <p className="mt-1 text-sm font-semibold">Mapa ogólna floty</p>
        </button>

        <div className="absolute right-5 top-5 rounded-2xl border border-white/10 bg-black/65 px-4 py-3 shadow-xl backdrop-blur">
          <div className="flex items-center gap-3">
          <span
              className={`h-4 w-4 rounded-full ${robot.color} ${robot.glow}`}
          />

            <div>
              <p className="text-sm font-bold">{robot.id}</p>
              <p className="text-xs text-zinc-400">{robot.parkName}</p>
            </div>

            <span
                className={`ml-2 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                    robot.status,
                )}`}
            >
            {robot.status}
          </span>
          </div>
        </div>

        {isOffline ? (
            <div className="absolute left-1/2 top-1/2 max-w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-rose-300/30 bg-black/75 p-7 text-center shadow-xl backdrop-blur">
              <p className="text-sm uppercase tracking-[0.25em] text-rose-300">
                Robot wyłączony z ruchu
              </p>

              <h3 className="mt-3 text-3xl font-black">{robot.id}</h3>

              <p className="mt-3 text-sm text-zinc-400">
                Ta jednostka znajduje się w trybie serwisowym, więc nie wykonuje
                trasy, nie zwiększa postępu patrolu, nie zapełnia zbiornika i nie
                dolicza statystyk.
              </p>
            </div>
        ) : (
            <div className="absolute bottom-5 left-5 max-w-[430px] rounded-2xl border border-white/10 bg-black/70 p-4 shadow-xl backdrop-blur">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                Live action view
              </p>

              <p className="mt-1 text-sm font-semibold">
                Statystyki startują od 0 i rosną z trasą
              </p>

              <p className="mt-1 text-xs text-zinc-400">
                Postęp, zbiornik, wykrycia i zebrane odchody zwiększają się razem z
                ruchem robota.
              </p>
            </div>
        )}
      </div>
  )
}

function RobotDetails({
                        robot,
                        elapsedSeconds,
                      }: {
  robot: Robot
  elapsedSeconds: number
}) {
  const liveState = getRobotLiveState(robot, elapsedSeconds)
  const isOffline = robot.status === 'Serwis'

  return (
      <Card className={`border ${robot.borderColor}`}>
        <p className={`text-sm font-semibold ${robot.textColor}`}>
          Wybrany robot
        </p>

        <div className="mt-2 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-3xl font-black">{robot.id}</h3>
            <p className="mt-1 text-zinc-400">{robot.model}</p>
          </div>

          <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                  robot.status,
              )}`}
          >
          {robot.status}
        </span>
        </div>

        <div className="mt-5 rounded-2xl bg-white/5 p-4">
          <p className="text-sm text-zinc-400">Lokalizacja</p>
          <p className="mt-1 text-xl font-bold">{robot.parkName}</p>
          <p className="mt-1 text-sm text-zinc-500">{robot.address}</p>
        </div>

        {isOffline && (
            <div className="mt-4 rounded-2xl border border-rose-300/20 bg-rose-400/10 p-4">
              <p className="text-sm font-semibold text-rose-300">
                Wyłączony z ruchu
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                Robot nie wykonuje trasy, a jego statystyki pozostają na poziomie 0.
              </p>
            </div>
        )}

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-sm text-zinc-400">Bateria</p>
            <p className="mt-2 text-2xl font-bold">{robot.battery}%</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-sm text-zinc-400">Zbiornik</p>
            <p className="mt-2 text-2xl font-bold">
              {liveState.containerFill}%
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-sm text-zinc-400">Wykryte</p>
            <p className="mt-2 text-2xl font-bold">
              {liveState.detectedDroppings}
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-4">
            <p className="text-sm text-zinc-400">Zebrane</p>
            <p className="mt-2 text-2xl font-bold">
              {liveState.collectedDroppings}
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-zinc-400">Postęp trasy</span>
              <span className="font-semibold">{liveState.progress}%</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div
                  className={`h-full rounded-full ${
                      isOffline ? 'bg-rose-400' : robot.color
                  }`}
                  style={{ width: `${liveState.progress}%` }}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-zinc-400">Zapełnienie zbiornika</span>
              <span className="font-semibold">{liveState.containerFill}%</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div
                  className={`h-full rounded-full ${
                      liveState.containerFill > 80
                          ? 'bg-amber-300'
                          : isOffline
                              ? 'bg-rose-400'
                              : robot.color
                  }`}
                  style={{ width: `${liveState.containerFill}%` }}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-zinc-400">Skuteczność operacyjna</span>
              <span className="font-semibold">{liveState.efficiency}%</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div
                  className={`h-full rounded-full ${
                      isOffline ? 'bg-rose-400' : robot.color
                  }`}
                  style={{ width: `${liveState.efficiency}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-white/5 p-4">
          <p className="text-sm text-zinc-400">Ostatnia aktualizacja</p>
          <p className="mt-1 text-xl font-bold">{robot.lastUpdate}</p>
        </div>
      </Card>
  )
}

function FleetList({
                     selectedRobotId,
                     onSelectRobot,
                   }: {
  selectedRobotId: string | null
  onSelectRobot: (robotId: string) => void
}) {
  return (
      <div className="grid gap-3">
        {robots.map((robot) => {
          const isSelected = robot.id === selectedRobotId
          const isOffline = robot.status === 'Serwis'

          return (
              <button
                  key={robot.id}
                  onClick={() => onSelectRobot(robot.id)}
                  className={`rounded-2xl border p-4 text-left transition hover:bg-white/10 ${
                      isSelected
                          ? `${robot.borderColor} bg-white/10`
                          : 'border-white/10 bg-black/25'
                  } ${isOffline ? 'opacity-75' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`h-3 w-3 rounded-full ${robot.color}`} />
                      <p className="font-semibold">{robot.name}</p>
                    </div>

                    <p className="mt-1 text-sm text-zinc-400">
                      {robot.model} · {robot.parkName}
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      {isOffline ? 'Wyłączony z ruchu' : robot.address}
                    </p>
                  </div>

                  <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                          robot.status,
                      )}`}
                  >
                {robot.status}
              </span>
                </div>
              </button>
          )
        })}
      </div>
  )
}

function App() {
  const [selectedRobotId, setSelectedRobotId] = useState<string | null>(null)
  const elapsedSeconds = useElapsedSeconds()

  const selectedRobot =
      robots.find((robot) => robot.id === selectedRobotId) ?? null

  const liveTotals = getFleetLiveTotals(elapsedSeconds)
  const liveRouteCompletion = getRouteCompletion(elapsedSeconds)
  const liveCleanliness = clampPercent(91 * (liveRouteCompletion / 100))
  const liveAverageEfficiency = clampPercent(
      maxAverageEfficiency * (liveRouteCompletion / 100),
  )

  const metrics: Metric[] = [
    {
      label: 'Wykryte odchody',
      value: String(liveTotals.detectedDroppings),
      description: `maksymalnie ${maxDetected} po pełnym patrolu`,
      trend: `${liveTotals.collectedDroppings} już zebrano`,
    },
    {
      label: 'Aktywne roboty',
      value: `${activeRobots} / ${robots.length}`,
      description: 'roboty online w pilotażu',
      trend: '1 w serwisie',
    },
    {
      label: 'Poziom czystości',
      value: `${liveCleanliness}%`,
      description: 'średnio dla 6 parków',
      trend: `${liveRouteCompletion}% wykonanej trasy`,
    },
  ]

  return (
      <main className="min-h-screen bg-[#07110d] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute bottom-[-160px] right-[-100px] h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1650px] px-6 py-8">
          <header className="mb-8 flex flex-col justify-between gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur md:flex-row md:items-center">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400 text-2xl font-black text-[#07110d]">
                  CP
                </div>

                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-emerald-300">
                    Clean Patrol
                  </p>

                  <h1 className="text-3xl font-bold md:text-5xl">
                    Panel monitoringu pilotażu
                  </h1>
                </div>
              </div>

              <p className="max-w-3xl text-sm leading-6 text-zinc-300 md:text-base">
                Widok floty 6 robotów skoncentrowanych na wykrywaniu i zbieraniu
                odchodów w warszawskich parkach.
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl bg-black/30 p-4">
              <StatusBadge>Pilotaż: 6 robotów</StatusBadge>
              <p className="text-sm text-zinc-400">Status systemu</p>
              <p className="text-2xl font-bold text-emerald-300">Online</p>
            </div>
          </header>

          <section className="mb-8 grid gap-4 md:grid-cols-3">
            {metrics.map((metric) => (
                <Card key={metric.label}>
                  <p className="text-sm text-zinc-400">{metric.label}</p>

                  <div className="mt-4 flex items-end justify-between gap-4">
                    <p className="text-4xl font-black tracking-tight">
                      {metric.value}
                    </p>

                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  {metric.trend}
                </span>
                  </div>

                  <p className="mt-3 text-sm text-zinc-400">
                    {metric.description}
                  </p>
                </Card>
            ))}
          </section>

          <section className="mb-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_430px]">
            <Card>
              <div className="mb-6 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
                    {selectedRobot ? 'Mapa przybliżona' : 'Mapa ogólna'}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {selectedRobot
                        ? `${selectedRobot.id} · ${selectedRobot.parkName}`
                        : 'Widok wszystkich robotów'}
                  </h2>

                  <p className="mt-2 max-w-3xl text-sm text-zinc-400">
                    {selectedRobot
                        ? selectedRobot.status === 'Serwis'
                            ? 'Robot znajduje się w trybie serwisowym i jest wyłączony z ruchu.'
                            : 'Wyświetlana jest dokładna trasa wybranego robota. Statystyki rosną od zera razem z postępem trasy.'
                        : 'Kliknij kolorową kropkę robota, aby przejść do widoku przybliżonego z trasą.'}
                  </p>
                </div>

                {selectedRobot && (
                    <button
                        onClick={() => setSelectedRobotId(null)}
                        className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-white/10"
                    >
                      Powrót do mapy ogólnej
                    </button>
                )}
              </div>

              {selectedRobot ? (
                  <DetailMap
                      robot={selectedRobot}
                      elapsedSeconds={elapsedSeconds}
                      onBack={() => setSelectedRobotId(null)}
                  />
              ) : (
                  <OverviewMap
                      selectedRobotId={selectedRobotId}
                      onSelectRobot={setSelectedRobotId}
                  />
              )}
            </Card>

            <div className="grid gap-6">
              {selectedRobot ? (
                  <RobotDetails
                      robot={selectedRobot}
                      elapsedSeconds={elapsedSeconds}
                  />
              ) : (
                  <Card>
                    <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
                      Widok floty
                    </p>

                    <h2 className="mt-2 text-2xl font-bold">Wybierz robota</h2>

                    <p className="mt-2 text-sm text-zinc-400">
                      Po kliknięciu mapa przybliży konkretną lokalizację i pokaże
                      trasę robota. Serwisowany robot nie wykonuje trasy.
                    </p>

                    <div className="mt-5">
                      <FleetList
                          selectedRobotId={selectedRobotId}
                          onSelectRobot={setSelectedRobotId}
                      />
                    </div>
                  </Card>
              )}

              <Card>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
                  Wyniki dnia
                </p>

                <h2 className="mt-2 text-2xl font-bold">Zbieranie odchodów</h2>

                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl bg-black/25 p-5">
                    <p className="text-sm text-zinc-400">Łącznie wykryto</p>
                    <p className="mt-2 text-4xl font-black">
                      {liveTotals.detectedDroppings}
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      z {maxDetected} możliwych po pełnym patrolu
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black/25 p-5">
                    <p className="text-sm text-zinc-400">Łącznie zebrano</p>
                    <p className="mt-2 text-4xl font-black">
                      {liveTotals.collectedDroppings}
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      z {maxCollected} możliwych po pełnym patrolu
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black/25 p-5">
                    <p className="text-sm text-zinc-400">Średnia skuteczność</p>
                    <p className="mt-2 text-4xl font-black">
                      {liveAverageEfficiency}%
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      rośnie wraz z wykonaniem trasy
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
            <Card>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
                Flota
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Status robotów pilotażowych
              </h2>

              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {robots.map((robot) => {
                  const isSelected = robot.id === selectedRobotId
                  const isOffline = robot.status === 'Serwis'

                  return (
                      <button
                          key={robot.id}
                          onClick={() => setSelectedRobotId(robot.id)}
                          className={`rounded-2xl border p-4 text-left transition hover:bg-white/10 ${
                              isSelected
                                  ? `${robot.borderColor} bg-white/10`
                                  : 'border-white/10 bg-black/25'
                          } ${isOffline ? 'opacity-75' : ''}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                          <span
                              className={`h-3 w-3 rounded-full ${robot.color}`}
                          />

                              <p className="font-semibold">{robot.name}</p>
                            </div>

                            <p className="mt-1 text-sm text-zinc-400">
                              {robot.model} · {robot.parkName}
                            </p>

                            <p className="mt-1 text-xs text-zinc-500">
                              {isOffline ? 'Wyłączony z ruchu' : robot.address}
                            </p>
                          </div>

                          <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                                  robot.status,
                              )}`}
                          >
                        {robot.status}
                      </span>
                        </div>
                      </button>
                  )
                })}
              </div>
            </Card>

            <Card>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
                Alerty
              </p>

              <h2 className="mt-2 text-2xl font-bold">Komunikaty systemowe</h2>

              <div className="mt-5 space-y-3">
                {alerts.map((alert) => (
                    <div
                        key={alert.title}
                        className="rounded-2xl border border-white/10 bg-black/25 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div
                            className={`mt-1 h-3 w-3 rounded-full ${getAlertDot(
                                alert.level,
                            )}`}
                        />

                        <div>
                          <p className="font-semibold">{alert.title}</p>

                          <p className="mt-1 text-sm text-zinc-400">
                            {alert.description}
                          </p>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </Card>
          </section>
        </div>
      </main>
  )
}

export default App