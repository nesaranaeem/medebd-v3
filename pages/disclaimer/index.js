import { NextSeo } from "next-seo";

const DisclaimerPage = () => {
  return (
    <>
      <NextSeo
        title="Disclaimer"
        description="The information provided on medebd.com is for general informational purposes only. We do our best to provide accurate and up-to-date information, but we make no representations or warranties of any kind about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose."
      />
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="text-3xl text-center my-4 font-extrabold text-gray-800">
          Disclaimer
        </h2>
        <p className="mb-3 font-normal text-gray-700">
          The information provided on medebd.com is for general informational
          purposes only. We do our best to provide accurate and up-to-date
          information, but we make no representations or warranties of any kind
          about the completeness, accuracy, reliability, suitability or
          availability with respect to the website or the information, products,
          services, or related graphics contained on the website for any
          purpose. Any reliance you place on such information is therefore
          strictly at your own risk. In no event will we be liable for any loss
          or damage including without limitation, indirect or consequential loss
          or damage, or any loss or damage whatsoever arising from loss of data
          or profits arising out of, or in connection with, the use of this
          website. Through this website you are able to link to other websites
          which are not under the control of medebd.com. We have no control over
          the nature, content and availability of those sites. The inclusion of
          any links does not necessarily imply a recommendation or endorse the
          views expressed within them. Every effort is made to keep the website
          up and running smoothly. However, medebd.com takes no responsibility
          for, and will not be liable for, the website being temporarily
          unavailable due to technical issues beyond our control. All the
          medical information on this website is for educational purposes only.
          It should not be used as a substitute for professional medical advice,
          diagnosis or treatment. Always seek the advice of your doctor or other
          qualified health care provider with any questions you may have
          regarding a medical condition. This website is intended for use by
          adults over the age of 18. If you are under 18, you should not use
          this website without the permission of a parent or guardian. We may
          change the terms of this disclaimer from time to time. By continuing
          to use the website after any such change, you accept the new terms. If
          you do not wish to accept the new terms, you should not continue to
          use the website. By using medebd.com, you acknowledge that you have
          read, understood, and agree to be bound by the terms of this
          disclaimer. If you do not agree to these terms, you must stop using
          this website.
        </p>
      </div>
    </>
  );
};

export default DisclaimerPage;
