
export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <section id="demo" className="py-8">
          <div className="border rounded-lg bg-card shadow-sm">
          </div>
        </section>
      </main>
      <footer className="border-t py-6 bg-card/50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} SalesThing</p>
          <div className="flex gap-6 mt-4 md:mt-0">
          </div>
        </div>
      </footer>
    </div>
  )
}
