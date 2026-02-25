import { Facebook, Smartphone, Phone } from "lucide-react";
import logoTarzo from "@/assets/logo-tarzo.png";
import PrivacyPolicyDialog from "./PrivacyPolicyDialog";
import TermsConditionsDialog from "./TermsConditionsDialog";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#inicio" className="inline-block mb-6">
              <img 
                src={logoTarzo} 
                alt="TARZO - Comércio e Distribuição" 
                className="h-20 w-auto"
              />
            </a>
            <p className="text-muted-foreground max-w-md mb-6">
              Preço justo, qualidade garantida e serviço com distribuição eficiente de carvão, batatas e cebolas.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/geraltarzo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary transition-colors group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {[
                { label: "Início", href: "#inicio" },
                { label: "Produtos", href: "#produtos" },
                { label: "Sobre Nós", href: "#sobre" },
                { label: "Benefícios", href: "#beneficios" },
                { label: "Contacto", href: "#contacto" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-6">Produtos</h4>
            <ul className="space-y-3">
              {[
                { label: "Carvão Premium", href: "#produtos" },
                { label: "Carvão Restaurante", href: "#produtos" },
                { label: "Carvão Nacional de Sobro", href: "#produtos" },
                { label: "Batatas Agria", href: "#frescos" },
                { label: "Cebolas", href: "#frescos" },
              ].map((product) => (
                <li key={product.label}>
                  <a
                    href={product.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {product.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} TARZO - Comércio e Distribuição. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <PrivacyPolicyDialog>
              <button className="hover:text-primary transition-colors">Política de Privacidade</button>
            </PrivacyPolicyDialog>
            <TermsConditionsDialog>
              <button className="hover:text-primary transition-colors">Termos e Condições</button>
            </TermsConditionsDialog>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
