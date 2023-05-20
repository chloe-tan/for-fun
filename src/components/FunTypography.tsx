import { ReactNode } from "react";

// Refer to tailwind.config.css
const typographyTailwindClassName = {
  [1]: "text-flg font-semibold",
  [2]: "text-fmd font-semibold",
  [3]: "text-fbase font-semibold",
} as any;

interface FunTypographyProps {
  level: number;
  children: ReactNode;
}

/**
 * Standardized fun typography component
 * @param {number} level 
 * 
 * #### Levels
 * level | size | height | weight
 * ------|------|--------|--------
 * 1     | 32px | 40px   | 600
 * 2     | 20px | 28px   | 600
 * 3     | 16px | 24px   | 600
 */
export default function FunTypography({ level = 3, children }: FunTypographyProps) {
  if (level > 3 || level < 1) {
    console.error("FunTypography level must be between 1 and 3; defaulting to 3");
    level = 3;
  }
  const className = typographyTailwindClassName?.[level as number];
  return (
    <p className={className}>
      {children}
    </p>
  )
}