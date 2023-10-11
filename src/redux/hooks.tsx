import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, State } from "./store";

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
