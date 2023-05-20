import { ReactNode, useMemo } from "react";

// Refer to tailwind.config.css
const typographyTailwindClassName = {
  [1]: "text-flg font-semibold",
  [2]: "text-fmd font-semibold",
  [3]: "text-fbase font-semibold",
  [4]: "text-fsm font-semibold",
} as any;

interface FunTypographyProps {
  level?: number;
  children: ReactNode;
  fontWeight?: string;
  textColor?: string;
  overrideStyles?: string;
}

/**
 * Standardized fun typography component
 * 
 * #### Levels
 * level | size | height | weight
 * ------|------|--------|--------
 * 1     | 32px | 40px   | 600
 * 2     | 20px | 28px   | 600
 * 3     | 16px | 24px   | 600
 * 4     | 14px | 20px   | 600
 */
export default function FunTypography({ level = 3, children, fontWeight = "font-semibold", textColor = "text-black", overrideStyles = "" }: FunTypographyProps) {
  if (level > 4 || level < 1) {
    console.error("FunTypography level must be between 1 and 4; defaulting to 3");
    level = 3;
  }
  const className = useMemo(() => `align-middle ${typographyTailwindClassName?.[level as number]} ${fontWeight} ${textColor} ${overrideStyles}`, [fontWeight, level, textColor, overrideStyles]);
  return (
    <p className={className}>
      {children}
    </p>
  )
}