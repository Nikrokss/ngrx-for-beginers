import {createAction, createFeatureSelector, createReducer, createSelector, on, props} from "@ngrx/store";

export const COUNTER_KEY = 'counter';

// имя экшена: [COUNTER] - каталог/категория, increase - действие которое должно происходить
export const increase = createAction('[COUNTER] increase');
export const decrease = createAction('[COUNTER] decrease');
export const clear = createAction('[COUNTER] clear');
export const changeUpdatedAt = createAction(
  '[COUNTER] change updated at',
  props<{updatedAt: number}>()
);

//объявить тип данных который будет храниться в хранилище
export interface CounterState {
  count: number;
  updatedAt?: number;
}

// начальное значение счетчика (константа)
export const initialState: CounterState = {
  count: 0
};


// редьюсер для видоизменения состояния
// обработать экшены которые к нам приходят
export const counterReducer = createReducer(
  initialState,
  // функция принимает в себя экшен, и функцию обратного вызова, которая принимает state и должна вернуть новый state
  // фигурные скобки для того, чтобы возвращал сразу новый объект
  // копируем старое состояние ...state
  // будем видоизменять свойство count, старый каунт + 1
  on(increase, state => ({
    ...state,
    count: state.count + 1
  })),
  on(decrease, state => ({
    ...state,
    count: state.count - 1
  })),
  on(clear, state => ({
    ...state,
    count: 0
  })),
  on(changeUpdatedAt, (state, action) => ({
    ...state,
    updatedAt: action.updatedAt
  }))
);


// чтобы связать с фронтенд, нам нужен селектор
// передаем ключ counter под которым хотим получить нашу фичу (должен совпадать с "export interface State")
export const featureSelector = createFeatureSelector<CounterState>(COUNTER_KEY);

// нам нужно добраться до значения счетчика count, создадим еще селектор, который будет переиспользовать предыдущий селектор
export const countSelector = createSelector(
  featureSelector,
  state => state.count
);

export const updatedAtSelector = createSelector(
  featureSelector,
  state => state.updatedAt
);
