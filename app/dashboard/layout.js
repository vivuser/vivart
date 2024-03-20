export default function DashboardLayout({
    children,
  }) {
    return (
      <section>
        <nav className="m-2">This is the nav bar</nav>
        {children}
      </section>
    )
  }