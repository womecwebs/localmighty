import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { Calendar, User, ArrowLeft, Zap, CheckCircle2 } from "lucide-react";
import { BLOG_POSTS } from "../data/blogPosts";

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      // Inject Schema
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.metaDescription,
        author: {
          "@type": "Organization",
          name: "LocalMighty",
        },
        datePublished: post.date,
        publisher: {
          "@type": "Organization",
          name: "LocalMighty",
        },
      };

      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      };

      const script1 = document.createElement("script");
      script1.type = "application/ld+json";
      script1.text = JSON.stringify(articleSchema);
      document.head.appendChild(script1);

      const script2 = document.createElement("script");
      script2.type = "application/ld+json";
      script2.text = JSON.stringify(faqSchema);
      document.head.appendChild(script2);

      return () => {
        document.head.removeChild(script1);
        document.head.removeChild(script2);
      };
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" />;
  }

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-500 transition-colors mb-8 text-sm font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" /> {post.author}
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold mb-8 leading-tight">
            {post.title}
          </h1>

          <div
            className="prose prose-invert max-w-none mb-16 blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* FAQ Section */}
          <div className="glass-card p-10 rounded-3xl border-slate-800/50 mb-16">
            <h2 className="font-display text-2xl font-bold mb-8 flex items-center gap-3">
              <CheckCircle2 className="text-cyan-500 w-6 h-6" /> Frequently
              Asked Questions
            </h2>
            <div className="space-y-8">
              {post.faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-bold text-lg mb-2 text-slate-200">
                    {faq.q}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="glass-card p-12 rounded-3xl text-center border-cyan-500/30 cyan-glow">
            <h2 className="font-display text-3xl font-bold mb-4">
              Fix Your AI Visibility Instantly
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Don't wait for the robots to find you. Get the $49 Instant AI
              Visibility Kit and secure your spot in the future of search.
            </p>
            <button
              onClick={() =>
                window.open(
                  "https://gum.new/gum/cmmbci548001504jvcuv8dn4o",
                  "_blank",
                )
              }
              className="bg-cyan-500 text-slate-950 px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-transform cyan-glow flex items-center justify-center gap-2 mx-auto"
            >
              Get the $49 Kit <Zap className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;
