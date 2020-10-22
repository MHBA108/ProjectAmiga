export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  LoginScreen: undefined;
  SplashScreen: undefined;
  SignUpScreen: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Stats: undefined;
  Resources: undefined;
  You: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type StatsParamList = {
  StatsScreen: undefined;
};

export type ResourcesParamList = {
  ResourcesScreen: undefined;
};

export type UserProfileParamList = {
  UserProfileScreen: undefined;
};

// TODO: remove LogData in favor of Log
export type LogData = {
  sliderValue: number;
  emotions: string[];
  color: string;
};

export type Log = {
  moodPercentile: number;
  text: string;
  timestamp: Date;
  moodWords: string[];
};

export type User = {
  avatar: string;
  streak: number;
  // TODO: add achievments
};
