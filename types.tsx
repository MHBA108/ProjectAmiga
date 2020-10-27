import { Moment } from "moment";

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

export type Log = {
  moodPercentile: number;
  text: string;
  timestamp: string;
  moodWords: string[];
};

export type User = {
  avatar: string;
  streak: number;
  // TODO: add achievments
};
