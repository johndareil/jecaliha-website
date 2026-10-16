import PageHero from "@/components/PageHero";
import ContactDetailsPanel from "@/components/contact/ContactDetailsPanel";
import MessagePanel from "@/components/contact/MessagePanel";
import LocationSection from "@/components/contact/LocationSection";

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's Build Something That Lasts"
        subtitle="Talk to our team about your project. Free consultation, honest pricing, and a clear plan forward."
      />

      <section className="bg-basalt pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-2">
              <ContactDetailsPanel />
            </div>
            <div className="lg:col-span-3">
              <MessagePanel formId="contact-page-form" />
            </div>
          </div>
        </div>
      </section>

      <LocationSection />
    </>
  );
}