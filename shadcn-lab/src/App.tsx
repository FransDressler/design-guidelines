import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const rows = [
  { name: 'Hafer & Rosine', qty: 240, price: '2,40 €', state: 'Im Ofen' },
  { name: 'Doppelschoko', qty: 1180, price: '2,90 €', state: 'Ausverkauft' },
  { name: 'Lebkuchen', qty: 96, price: '3,10 €', state: 'Saisonal' },
]

function Stock() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <Badge variant="secondary" className="w-fit">✨ Neu</Badge>
          <CardTitle>Vorbestellung starten</CardTitle>
          <CardDescription>Seamlessly manage your cookie orders with our powerful platform.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Label htmlFor="e1">E-Mail</Label>
          <Input id="e1" placeholder="name@example.com" />
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2">
          <Button>Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader><CardTitle>Heute</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Sorte</TableHead><TableHead>Stück</TableHead><TableHead>Preis</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {rows.map(r => (
                <TableRow key={r.name}><TableCell>{r.name}</TableCell><TableCell>{r.qty}</TableCell><TableCell>{r.price}</TableCell><TableCell><Badge variant="outline">{r.state}</Badge></TableCell></TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function Tuned() {
  return (
    <div className="flex flex-col gap-10">
      {/* Card without the card: a rule + text block; big jump between display and body */}
      <section className="border-t-2 border-foreground pt-4">
        <p className="mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">Vorbestellung · Woche 46</p>
        <h2 className="mt-3 text-[clamp(34px,9vw,44px)] leading-[0.95] font-semibold tracking-[-0.03em]">Morgen um 7&nbsp;Uhr<br />warm abholen.</h2>
        <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-muted-foreground">
          Bis 18 Uhr bestellen, wir backen über Nacht. Ab 12 Stück liefern wir in Schwerin.
        </p>
        <form className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row sm:items-end sm:gap-2" onSubmit={e => e.preventDefault()}>
          <div className="flex flex-1 flex-col gap-1.5">
            <Label htmlFor="e2" className="mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">E-Mail für die Abholbestätigung</Label>
            <Input id="e2" placeholder="name@beispiel.de" className="h-10 rounded-none border-0 border-b-2 border-input bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-primary" />
          </div>
          <Button className="h-11 rounded-[var(--radius)] px-5 text-[15px] font-semibold">Platz reservieren</Button>
        </form>
        <p className="mt-3 text-[13px] text-muted-foreground">Oder <a className="underline underline-offset-4 decoration-1 hover:text-foreground" href="#">Sortiment ansehen</a></p>
      </section>

      {/* Table: tabular numbers right-aligned, status as text with a dot, hairlines only */}
      <section>
        <div className="flex items-baseline justify-between border-b border-foreground pb-2">
          <h3 className="text-[20px] font-semibold tracking-[-0.01em]">Heute im Ofen</h3>
          <span className="mono text-[11px] text-muted-foreground">Stand 06:40</span>
        </div>
        <Table className="text-[14px]">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="mono h-9 px-0 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">Sorte</TableHead>
              <TableHead className="mono h-9 text-right text-[11px] uppercase tracking-[0.1em] text-muted-foreground">Stück</TableHead>
              <TableHead className="mono h-9 text-right text-[11px] uppercase tracking-[0.1em] text-muted-foreground">Preis</TableHead>
              <TableHead className="mono h-9 pr-0 text-right text-[11px] uppercase tracking-[0.1em] text-muted-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(r => (
              <TableRow key={r.name} className="hover:bg-muted/40">
                <TableCell className="px-0 py-3 font-medium">{r.name}</TableCell>
                <TableCell className="py-3 text-right tabular-nums">{r.qty.toLocaleString('de-DE')}</TableCell>
                <TableCell className="py-3 text-right tabular-nums">{r.price}</TableCell>
                <TableCell className="py-3 pr-0 text-right">
                  <span className={'inline-flex items-center gap-1.5 ' + (r.state === 'Ausverkauft' ? 'text-muted-foreground line-through' : '')}>
                    <span className={'size-1.5 rounded-full ' + (r.state === 'Im Ofen' ? 'bg-primary' : 'bg-muted-foreground')} />{r.state}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  )
}

const palettes = ['crumbz', 'zyorex', 'pelmatech'] as const

export default function App() {
  const [p, setP] = useState<(typeof palettes)[number]>('crumbz')
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="border-b p-5 sm:p-8 md:border-b-0 md:border-r lg:p-12">
        <p className="mb-8 font-mono text-xs text-muted-foreground">A — shadcn/ui out of the box (base-nova, neutral)</p>
        <Stock />
      </div>
      <div className="tuned bg-background p-5 text-foreground sm:p-8 lg:p-12" data-p={p}>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <p className="mono text-xs text-muted-foreground">B — dieselben Komponenten, getunt</p>
          <div className="flex gap-1">
            {palettes.map(x => (
              <button key={x} onClick={() => setP(x)} className={'mono min-h-11 rounded-[var(--radius)] border px-3 text-[11px] uppercase ' + (x === p ? 'border-foreground' : 'border-transparent text-muted-foreground')}>{x}</button>
            ))}
          </div>
        </div>
        <Tuned />
      </div>
    </div>
  )
}
