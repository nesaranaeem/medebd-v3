import { NextSeo } from "next-seo";

const ContactPage = () => {
  return (
    <>
      <NextSeo
        title="Contact"
        description="Thank you for visiting medebd.com. We value your feedback and suggestions, and we would love to hear from you. For general inquiries, please use the details below to contact us. We will do our best to respond to your message."
      />
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="text-3xl text-center my-4 font-extrabold text-gray-800">
          Contact Us
        </h2>
        <p className="mb-3 font-normal text-gray-700">
          Thank you for visiting medebd.com. We value your feedback and
          suggestions, and we would love to hear from you. For general
          inquiries, please use the details below to contact us. We will do our
          best to respond to your message. If you need to report a problem or
          error with our website, please include as many details as possible,
          including the specific page or feature that you were using, and the
          error message or problem that you encountered. For medical
          emergencies, please do not contact us. Instead, call the emergency
          services in your area immediately. Our email:{" "}
          <span className="font-bold">info[at]medebd.com</span>
        </p>
      </div>
    </>
  );
};

export default ContactPage;
