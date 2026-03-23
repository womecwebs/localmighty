import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";
import { BLOG_POSTS } from "../data/blogPosts";

const BlogHub: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-cyan-500 font-bold text-xs uppercase tracking-[0.2em] mb-4 block"
          >
            LocalMighty Intelligence
          </motion.span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            The AI Search Blog
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Stay ahead of the curve with our deep dives into GEO, AEO, and the
            future of local business marketing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-3xl overflow-hidden border-slate-800/50 flex flex-col group"
            >
              <div className="p-8 flex flex-col grow">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" /> {post.author}
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 grow">
                  {post.excerpt}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-cyan-500 font-bold text-sm hover:gap-3 transition-all"
                >
                  Read Full Post <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogHub;
