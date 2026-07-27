import Link from "next/link";
import { ArrowRight } from "../Icons";

export default function CallToAction() {
    return (
        <section className="cta-section">
            <div className="container cta-inner">
                <div>
                    <span>UN PROJET STRATÉGIQUE À DÉPLOYER ?</span>
                    <h2>Nous préparons des solutions crédibles, concrètes et prêtes à être utilisées.</h2>
                </div>
                <Link className="button light" href="/contact">
                    Parler à un expert ABA <ArrowRight />
                </Link>
            </div>
        </section>
    );
}
