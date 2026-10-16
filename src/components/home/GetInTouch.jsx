import SectionHeading from "@/components/SectionHeading";
import ContactColumns from "@/components/ContactColumns";

export default function GetInTouch() {
  return (
    <section id="contact" className="bg-basalt py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Ready to Start Your Project?"
          subtitle="Contact us today for a free consultation. Our team is ready to bring your vision to life with expert craftsmanship and unparalleled service."
        />

        <div className="mt-14">
          <ContactColumns formId="home-contact-form" />
        </div>
      </div>
    </section>
  );
}