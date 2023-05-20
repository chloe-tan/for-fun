export function truncateAndShortenStr(str: string, visiblePrefix = 10, visibleSuffix = 10) {
  if (str?.length > visiblePrefix + visibleSuffix + 4) {
    if (visibleSuffix === 0) return str.slice(0, visiblePrefix) + "...";
    else return str.slice(0, visiblePrefix) + "..." + str.slice(-visibleSuffix);
  } else return str;
}