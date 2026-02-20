import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-header-primary">Home</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Privacy Policy</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-black uppercase tracking-wide mb-6">Privacy Policy</h1>

        <div className="prose prose-sm max-w-none dark:prose-invert space-y-6 text-foreground/90">
          <p>
            At Fastenersinc.net, accessible from <a href="https://fastenersinc.net" className="text-header-primary hover:underline">Fastenersinc.net</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by Fastenersinc.net and how we use it.
          </p>
          <p>If you have any questions or require more information about our Privacy Policy, please feel free to contact us.</p>
          <p>This Privacy Policy applies only to our online activities and is valid for visitors to our website regarding the information they share and/or collect in Fastenersinc.net. It is not applicable to any information collected offline or through channels other than this website.</p>

          <hr className="border-border" />

          <h3 className="text-lg font-bold">Consent</h3>
          <p>By using our website, you consent to our Privacy Policy and agree to its terms.</p>

          <hr className="border-border" />

          <h3 className="text-lg font-bold">Information We Collect</h3>
          <p>The personal information you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
          <p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you send us, and any other information you may choose to provide.</p>
          <p>When you register for an account, we may request your contact information, which may include items such as your name, company name, address, email address, and telephone number.</p>

          <hr className="border-border" />

          <h3 className="text-lg font-bold">No Disclosure or Exchange of Personally Identifiable Information (PII)</h3>
          <p>At Fastenersinc.net, we respect your privacy. <strong>Your Personally Identifiable Information (PII) will not be disclosed, exchanged, or sold to any third parties for marketing purposes</strong> under any circumstances. We are committed to protecting your personal data and will never share it with third parties for marketing, promotional, or any similar purposes.</p>

          <hr className="border-border" />

          <h3 className="text-lg font-bold">How We Use Your Information</h3>
          <p>We use the information we collect in the following ways:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>To provide, operate, and maintain our website</li>
            <li>To improve, personalize, and expand our website</li>
            <li>To understand and analyze how you use our website</li>
            <li>To develop new products, services, features, and functionality</li>
            <li>To communicate with you, directly or through one of our partners, including for customer service, updates, and marketing or promotional purposes</li>
            <li>To send you emails</li>
            <li>To find and prevent fraud</li>
          </ul>

          <hr className="border-border" />

          <h3 className="text-lg font-bold">How Do We Share Your Mobile Information?</h3>
          <p>No mobile information will be obtained from and/or shared with third parties or affiliates for marketing or promotional purposes. All mobile-related communications will exclude text messaging originator opt-in data and consent. <strong>This information will not be shared with any third parties.</strong></p>
          <p>You can always decline or stop receiving messages by responding with the word "STOP" at any time. For more information, reply with "HELP." Please note that message and data rates may apply, and message frequency may vary.</p>

          <hr className="border-border" />

          <h3 className="text-lg font-bold">Log Files</h3>
          <p>Fastenersinc.net follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files includes Internet Protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamps, referring/exit pages, and possibly the number of clicks. This information is not linked to personally identifiable information. The purpose of this data is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>

          <hr className="border-border" />

          <h3 className="text-lg font-bold">Cookies and Web Beacons</h3>
          <p>Like most websites, Fastenersinc.net uses cookies to store information, including visitors' preferences and the pages on the website that the visitor accessed or visited. The information is used to optimize users' experiences by customizing our web page content based on visitors' browser types and/or other information.</p>

          <hr className="border-border" />

          <h3 className="text-lg font-bold">Advertising Partners Privacy Policies</h3>
          <p>Third-party ad servers or ad networks use technologies like cookies, JavaScript, or web beacons that are used in their advertisements and links that appear on Fastenersinc.net. These technologies are sent directly to users' browsers, which automatically receive your IP address when this occurs. They use these technologies to measure the effectiveness of their advertising campaigns or to personalize the advertising content you see on websites you visit.</p>
          <p>Please note that Fastenersinc.net does not have access to or control over these cookies used by third-party advertisers.</p>

          <hr className="border-border" />

          <h3 className="text-lg font-bold">Third-Party Privacy Policies</h3>
          <p>Fastenersinc.net's Privacy Policy does not apply to other advertisers or websites. Therefore, we advise you to consult the respective Privacy Policies of third-party ad servers for more detailed information. This may include their practices and instructions on how to opt-out of certain options.</p>
          <p>You can choose to disable cookies through your browser settings.</p>

          <hr className="border-border" />

          <h3 className="text-lg font-bold">CCPA Privacy Rights (Do Not Sell My Personal Information)</h3>
          <p>Under the California Consumer Privacy Act (CCPA), among other rights, California consumers have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Request that a business disclose the categories and specific pieces of personal data it has collected about consumers.</li>
            <li>Request that a business delete any personal data about the consumer it has collected.</li>
            <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
          </ul>
          <p>If you make a request, we have one month to respond. If you would like to exercise any of these rights, please contact us.</p>

          <hr className="border-border" />

          <h3 className="text-lg font-bold">GDPR Data Protection Rights</h3>
          <p>We want to ensure you are fully aware of all your data protection rights. Every user is entitled to the following:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>The right to access</strong> – You have the right to request copies of your personal data. We may charge a small fee for this service.</li>
            <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
            <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
            <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data we have collected to another organization or directly to you, under certain conditions.</li>
          </ul>
          <p>If you make a request, we have one month to respond. If you would like to exercise any of these rights, please contact us.</p>

          <hr className="border-border" />

          <h3 className="text-lg font-bold">Children's Information</h3>
          <p>We prioritize the protection of children using the internet. We encourage parents and guardians to monitor and guide their online activity.</p>
          <p>Fastenersinc.net does not knowingly collect any Personal Identifiable Information (PII) from children under the age of 13. If you believe your child has provided such information on our website, we strongly encourage you to contact us immediately so we can take appropriate action to remove the information from our records.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
