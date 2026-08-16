import { getLocale } from "contexts/language";

export type LocaleTimeDate = {
  date: string;
  time: string;
};

export const formatLocaleDateTime = (now: Date): LocaleTimeDate => {
  const locale = getLocale();

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    hour12: true,
    minute: "2-digit",
    second: "2-digit",
  });

  const dayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
  });

  const date = dateFormatter.format(now);
  const day = dayFormatter.format(now);
  const time = timeFormatter.format(now);

  return {
    date: `${date}\n${day}`,
    time,
  };
};

export const CLOCK_TEXT_HEIGHT_OFFSET = 1;