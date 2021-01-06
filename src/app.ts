export default function printMe() {
  console.log('I am not an error!');
  console.log(`🔰 MyEnum: ${MyEnum.one}`)
}

export enum MyEnum {
  one = 1,
  two = 2
}