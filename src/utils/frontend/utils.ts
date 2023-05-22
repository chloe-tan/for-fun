import { CoinTickerDetailMap } from "@/const/coins";

export function truncateAndShortenStr(str: string, visiblePrefix = 10, visibleSuffix = 10) {
  if (str?.length > visiblePrefix + visibleSuffix + 4) {
    if (visibleSuffix === 0) return str.slice(0, visiblePrefix) + "...";
    else return str.slice(0, visiblePrefix) + "..." + str.slice(-visibleSuffix);
  } else return str;
}


interface FormatNumberOptions {
  /** Numbers smaller than this will be converted to scientific notation */
  minBeforeUseScientific?: number;
  /** If the number part for suffixed # is >= this, will use sci notation (e.g. 1,000M -> 1E3M) */
  maxNumberPartSizeForSuffix?: number;
  /** The amount of decimal places to truncate to when softly truncating (to specify decimal places for suffix-truncation, e.g. 1.23M, use decimalPrecisionForSuffix) */
  softDecimalPrecision?: number;
  /** Numbers >= this will have their decimals truncated aggressively */
  maxBeforeAggresiveDecimalTruncation?: number;
  /** The amount of decimal places to truncate to when aggressively truncating (to specify decimal places for suffix-truncation, e.g. 1.23M, use decimalPrecisionForSuffix) */
  aggresiveDecimalPrecision?: number;
  /** Numbers >= this will have a suffix added during truncation (e.g. 1.23M) */
  maxBeforeUseSuffix?: number;
  /** The amount of decimal places to truncate suffix-truncated numbers to (e.g. 1.23M vs 1.2312M)*/
  decimalPrecisionForSuffix?: number;
  /** The largest suffix to use (e.g. if 1000000, we will stop at M and not use the B suffix) */
  maxSuffixSize?: 1e3 | 1e6 | 1e9 | 1e12;
  numberFormatOptions?: Intl.NumberFormatOptions;
}
const FORMAT_NUMBER_DEFAULT: FormatNumberOptions = {
  minBeforeUseScientific: 0.00001,
  maxBeforeAggresiveDecimalTruncation: 1,
  softDecimalPrecision: 5,
  aggresiveDecimalPrecision: 5,
  maxBeforeUseSuffix: 1000000,
  decimalPrecisionForSuffix: 5,
  maxSuffixSize: 1000000,
  maxNumberPartSizeForSuffix: 1e3,
};
/**
 * Formats a number with conditional truncation, suffixation, and scientific notation.
 * @param number
 * @param options Customize the formatting conditions/behavior
 * @example Visualization, using default values:
 * ```
 * <--(1.23E-7)---0.00001------(0.12121)-------1-------(123,423.26)---1,000,000---(1.22M)--(100.23M)-->
 * _______<-minBeforeScientific       maxBeforeAggressive->      maxBeforeUseSuffix->         ^ w/ maxSuffixSize
 * ```
 */
export function formatNumberAndStringify(
  number: number,
  options: FormatNumberOptions = FORMAT_NUMBER_DEFAULT,
  numberFormatOptions = {}
) {
  const {
    minBeforeUseScientific,
    softDecimalPrecision,
    maxBeforeAggresiveDecimalTruncation,
    aggresiveDecimalPrecision,
    maxBeforeUseSuffix,
    decimalPrecisionForSuffix,
    maxSuffixSize,
    maxNumberPartSizeForSuffix,
  } = { ...FORMAT_NUMBER_DEFAULT, ...options };
  if (number === 0) return number.toLocaleString("en", { ...numberFormatOptions });
  if (!number) return "";
  const absoluteNumber = Math.abs(number);

  const roundedForSuffix = absoluteNumber.toFixed(decimalPrecisionForSuffix);
  // rounding to decimal precision may increment the number high enough to require a suffix
  // @ts-ignore
  if (Number(roundedForSuffix) >= maxBeforeUseSuffix) {
    return _formatTruncated(
      number,
      decimalPrecisionForSuffix,
      false,
      true,
      maxSuffixSize,
      maxNumberPartSizeForSuffix,
      numberFormatOptions
    );
  }
  // @ts-ignore
  if (absoluteNumber >= maxBeforeAggresiveDecimalTruncation) {
    return number.toLocaleString("en", {
      maximumFractionDigits: aggresiveDecimalPrecision,
      ...numberFormatOptions,
    });
  }
  // @ts-ignore
  if (absoluteNumber < minBeforeUseScientific) {
    return number.toLocaleString("en", {
      notation: "scientific",
      maximumFractionDigits: aggresiveDecimalPrecision,
      ...numberFormatOptions,
    });
  }
  // else, minBeforeScientific <= number < maxBeforeAggresive
  return number.toLocaleString("en", {
    maximumFractionDigits: softDecimalPrecision,
    ...numberFormatOptions,
  });
}

/** Formats a number for currency (default $) display */
export function formatCurrencyAndStringify(
  amount: number,
  /** Options to pass `formatNumberAndStringify */
  options: FormatNumberOptions = {},
  /** Options to pass toLocaleString */
  numberFormatOptions: Intl.NumberFormatOptions = {}
) {
  const defaultOptions: FormatNumberOptions = {
    maxSuffixSize: 1e12,
    minBeforeUseScientific: 0.000001,
    decimalPrecisionForSuffix: 2,
    aggresiveDecimalPrecision: 2,
    softDecimalPrecision: 6,
  };
  const defaultNumberFormatOptions: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "USD",
  };

  const formattedAsString = formatNumberAndStringify(
    amount,
    { ...defaultOptions, ...options },
    {
      ...defaultNumberFormatOptions,
      ...numberFormatOptions,
    }
  );
  return formattedAsString;
}

/**
 * Formats a cryptocurrency amount as a string for display.
 *
 * Can customize with options and whether to display currency abbreviation.
 */
export function formatCryptoAndStringify(
  /** The currency amount */
  amount: number,
  /** Used to look up currency abbreviation. Can be a custom string if you want a custom abbreviation for some reason */
  platform: string = "",
  /** Displays abbreviation after amount, e.g. '1.25 ETH'; default true
   *  For custom abbr, set it as `platform`
   */
  useCurrencyAbbreviation: boolean = true,
  /** Used to format the number, can be used to customize decimal truncation etc. */
  options?: FormatNumberOptions
) {
  const formattedAsString = formatNumberAndStringify(amount, options);

  // get currency 
  // @ts-ignore
  let abbr = CoinTickerDetailMap?.[platform?.toUpperCase()]?.ticker || platform;

  let result = formattedAsString;
  if (useCurrencyAbbreviation && abbr) {
    result = `${formattedAsString} ${abbr}`;
  }
  return result;
}

function _formatTruncated(
  value: number,
  precision = 2,
  keepTrailingZeros = false,
  useComma = false,
  maxSuffixValue = 1e12,
  maxNumberPartSizeForSuffix = 1e3,
  numberFormatOptions = {}
) {
  value = +value;
  if (Number.isNaN(value)) {
    throw new Error("invalid number for `value` passed in to `formatTruncated`");
  }
  const negetive = value < 0;
  value = Math.abs(value);

  function getFormattedNumberPartAndSuffix(
    divideBy: number,
    suffixStr = "",
    nextSuffixStr = ""
  ): [formatted: string, suffix: string] {
    const dividedVal = value / divideBy;
    const rawDividedValRounded = dividedVal.toFixed(precision);

    // use sci notation for large number parts
    const useScientific =
      Number(rawDividedValRounded) >= maxNumberPartSizeForSuffix ||
      (divideBy === 1e12 && Number(rawDividedValRounded) >= 1e3); // anything >= 1,000T should be sci notation

    // the rounding that occurs due to decimal precision can increase the suffix size, e.g. 999.999999 -> 1K
    const incrementToNextSuffix = maxSuffixValue > divideBy && Number(rawDividedValRounded) >= 1000;
    const suffix = !incrementToNextSuffix ? suffixStr : nextSuffixStr;
    const dividedValRounded = !incrementToNextSuffix
      ? rawDividedValRounded
      : (Number(rawDividedValRounded) / 1000).toFixed(precision);

    if (useComma || useScientific) {
      return [
        Number(dividedValRounded).toLocaleString("en", {
          // don't use sci notation if the dividedValRounded is 1 because otherwise we get "1EB" instead of "1B"
          ...(useScientific && Number(dividedValRounded) !== 1 && { notation: "scientific" }),
          maximumFractionDigits: precision,
          ...numberFormatOptions,
        }),
        suffix,
      ];
    }
    return [dividedValRounded, suffix];
  }

  let [formatted, suffix] = getFormattedNumberPartAndSuffix(1, "", "K");
  if (value >= 1e3 && (value < 1e6 || maxSuffixValue === 1e3)) {
    [formatted, suffix] = getFormattedNumberPartAndSuffix(1e3, "K", "M");
  } else if (value >= 1e6 && (value < 1e9 || maxSuffixValue === 1e6)) {
    [formatted, suffix] = getFormattedNumberPartAndSuffix(1e6, "M", "B");
  } else if (value >= 1e9 && (value < 1e12 || maxSuffixValue === 1e9)) {
    [formatted, suffix] = getFormattedNumberPartAndSuffix(1e9, "B", "T");
  } else if (value >= 1e12) {
    [formatted, suffix] = getFormattedNumberPartAndSuffix(1e12, "T");
  }

  if (!keepTrailingZeros && !formatted?.includes("E")) {
    const [before, after] = formatted.split(".");
    const trimmedAfter = after?.replace(/0+$/gm, "");
    formatted = before;
    if (trimmedAfter?.length > 0) {
      formatted += "." + trimmedAfter;
    }
  }
  if (negetive) {
    formatted = "-" + formatted;
  }
  formatted += suffix;
  return formatted;
}
