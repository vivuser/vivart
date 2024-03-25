export default function DashboardLayout({
    children,
  }) {
    return (
      <section>
        <nav>This is the nav bar</nav>
        {children}
      </section>
    )
  }