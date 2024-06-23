type StatusColor = {
  backgroundColor: string;
  textColor: string;
};

export type ThemeStatusKey = "open" | "closed" | "rejected" | "inProgress";

export type ThemeStatus = Record<ThemeStatusKey, StatusColor>;
