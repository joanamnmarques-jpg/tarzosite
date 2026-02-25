import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Smartphone, Mail, Clock, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const googleMapsUrl = "https://www.google.com/maps/dir/?api=1&destination=Cabeça+Gorda+Lourinhã+Portugal";

const contactInfo = [
  {
    icon: MapPin,
    label: "Morada",
    value: "Cabeça Gorda, Lourinhã, Portugal",
    href: googleMapsUrl,
  },
  {
    icon: Smartphone,
    label: "Telemóvel",
    value: "+351 917 197 562",
    href: "tel:917197562",
  },
  {
    icon: Phone,
    label: "Telefone Fixo",
    value: "+351 261 050 479",
    href: "tel:261050479",
  },
  {
    icon: Mail,
    label: "Email",
    value: "tarzogeral@hotmail.com",
    href: "mailto:tarzogeral@hotmail.com",
  },
  {
    icon: Clock,
    label: "Horário",
    value: "Segunda - Sexta: 8h - 19h\nSábado: 9h - 17h",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    nif: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track button click in Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        event_category: 'Contact Form',
        event_label: 'Enviar Mensagem',
      });
    }

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Mensagem Enviada!",
        description: "Entraremos em contacto consigo brevemente.",
      });
      setFormData({ name: "", company: "", nif: "", email: "", phone: "", message: "" });
    } catch (error: any) {
      console.error("Error sending email:", error);
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar a mensagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contacto" className="py-16 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary uppercase tracking-widest text-sm font-medium">Contacto</span>
          <h2 className="font-display text-5xl md:text-6xl text-foreground mt-4 mb-6">
            VAMOS CONVERSAR
          </h2>
          <p className="text-muted-foreground text-lg">
            Pronto para elevar a qualidade dos seus grelhados? 
            Entre em contacto para um orçamento personalizado.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">{item.label}</div>
                  {item.href ? (
                    <a 
                      href={item.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-foreground whitespace-pre-line hover:text-primary transition-colors cursor-pointer"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-foreground whitespace-pre-line">{item.value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <a 
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 h-64 bg-card rounded-xl border border-border overflow-hidden flex items-center justify-center text-muted-foreground hover:border-primary/50 transition-colors cursor-pointer group"
            >
              <div className="text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                <p className="text-sm group-hover:text-primary transition-colors">Cabeça Gorda, Lourinhã</p>
                <p className="text-xs text-muted-foreground mt-1">Clique para abrir no Google Maps</p>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="font-display text-2xl text-foreground mb-6">Pedir Orçamento</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">Nome *</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-secondary border-border"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm text-muted-foreground mb-2">Empresa</label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nif" className="block text-sm text-muted-foreground mb-2">NIF *</label>
                  <Input
                    id="nif"
                    name="nif"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={formData.nif}
                    onChange={handleChange}
                    required
                    maxLength={9}
                    placeholder="123456789"
                    className="bg-secondary border-border"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm text-muted-foreground mb-2">Telefone</label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">Email *</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-secondary border-border"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">Mensagem *</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-secondary border-border resize-none"
                  placeholder="Descreva o que pretende..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" variant="glow" size="lg" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      A enviar...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
                <Button asChild variant="outline" size="lg" className="flex-1">
                  <a 
                    href="tel:917197562"
                    onClick={() => {
                      if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'click', {
                          event_category: 'Contact Form',
                          event_label: 'Ligar',
                        });
                      }
                    }}
                  >
                    <Phone className="w-4 h-4 mr-2 text-green-500" />
                    Ligar
                  </a>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
