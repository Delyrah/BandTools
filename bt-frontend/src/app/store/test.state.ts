import { createFeatureSelector, createSelector } from "@ngrx/store";
import { beforeEach } from "node:test";

interface TestState {
    count1: number;
    count2: number;
    hurensohn: 'yes' | 'no';
}

const selector = createFeatureSelector<TestState>('slctr');

const selectCount1 = createSelector(selector, (s) => {
    return s.count1;
})

const selectHurensohn = createSelector(selector, (s) => {
    return s.hurensohn;
})

const selectMultipliedProps = () => 
    createSelector(
        selectCount1,
        (count: number, props: { multiplier: number }) => {
            return count * props.multiplier
        }
    )

const selectMultiplied = (props: { multiplier: number }) => 
    createSelector(selectCount1, (count) => {
        return count * props.multiplier
    })