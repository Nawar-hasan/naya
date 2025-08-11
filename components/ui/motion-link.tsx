"use client";
import { motion, MotionProps } from "framer-motion";
import Link, { type LinkProps } from "next/link";

const Motion = motion(Link);
type MotionLinkType = MotionProps & LinkProps & { className: string };
const MotionLink = (props: MotionLinkType) => {
  return <Motion {...props} />;
};

export default MotionLink;
