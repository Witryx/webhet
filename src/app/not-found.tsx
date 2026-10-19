import { Container, Button } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="not-found">
      <Container>
        <span className="eyebrow">
          <span />
          404 / TADY NIC NENÍ
        </span>
        <h1>
          Tahle cesta
          <br />
          nikam nevede.
        </h1>
        <p>
          Stránka se mohla přestěhovat nebo adresa není správná.
          <br />
          Vraťme se tam, kde to dává smysl.
        </p>
        <Button href="/">Zpátky na úvod</Button>
        <Button href="/kontakt" secondary>
          Kontaktovat WebHet
        </Button>
      </Container>
    </section>
  );
}
