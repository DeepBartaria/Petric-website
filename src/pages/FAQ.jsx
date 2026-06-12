import FaqList from '../components/Faqslist'
import Footer from '../components/Footer'
import SEO  from "../components/SEO"
export default function FAQs() {
  return (
    <>
      <SEO
        title="Frequently Asked Questions about Petric - Fast Pet Supplies Delivery in Gurgaon"
        description="Got questions about Petric? Find answers about delivery times, areas served, returns, payment options, and more. Fast pet supplies in Gurgaon."
        canonical="https://petric.in/faqs"
      />
      <FaqList />
      <Footer />
    </>
  )
}