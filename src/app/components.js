import { createComponents } from "framework";
import { CounterOne } from '@/components/CounterOne';
import { CounterTwo } from '@/components/CounterTwo';
import { CounterThree } from '@/components/CounterThree';
import { CustomLink } from '@/components/CustomLink';
import { Input } from '@/components/Input';

createComponents({
  "counter-one": CounterOne,
  "counter-two": CounterTwo,
  "counter-three": CounterThree,
  "custom-link": CustomLink,
  "x-input": Input
});
