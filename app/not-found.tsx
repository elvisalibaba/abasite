import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <span>404</span>
        <h1>Cette page n’existe pas.</h1>
        <p>Le lien est peut-être ancien ou incomplet. Même les sites institutionnels ont parfois des couloirs qui ne mènent nulle part.</p>
        <Link className="button primary" href="/">Retour à l’accueil</Link>
      </div>
    </section>
  );
}
