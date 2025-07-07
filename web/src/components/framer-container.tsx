"use client";
import { motion, useInView } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "~/lib/utils";
import { useRef } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};
export function DivContainer({ children, className = "" }: ContainerProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  return (
    <motion.div
      ref={containerRef}
      className={cn("", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1.0 }}
    >
      {children}
    </motion.div>
  );
}
export function SectionContainer({
  children,
  className = "",
  id,
}: ContainerProps) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  return (
    <motion.section
      ref={containerRef}
      className={cn("w-full py-12 md:py-24 lg:py-32", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1.0 }}
      id={id}
    >
      {children}
    </motion.section>
  );
}
