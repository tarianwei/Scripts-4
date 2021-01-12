let FruitShareCodes = [
  '841aa1159919442f8beb9c3d483fd9fa@8f9286f0ff9240c8a59fcc33335c4eda@5c3eba0f57614ff082ce0f7777ecccba@7d45c92a3bab40ae8917090dcddfe494',//账号一的好友shareCode,不同好友中间用@符号隔开
  '841aa1159919442f8beb9c3d483fd9fa@8f9286f0ff9240c8a59fcc33335c4eda@5c3eba0f57614ff082ce0f7777ecccba@7d45c92a3bab40ae8917090dcddfe494',//账号二的好友shareCode，不同好友中间用@符号隔开
  '841aa1159919442f8beb9c3d483fd9fa@8f9286f0ff9240c8a59fcc33335c4eda@5c3eba0f57614ff082ce0f7777ecccba@7d45c92a3bab40ae8917090dcddfe494',//账号三的好友shareCode，不同好友中间用@符号隔开
  '841aa1159919442f8beb9c3d483fd9fa@8f9286f0ff9240c8a59fcc33335c4eda@5c3eba0f57614ff082ce0f7777ecccba@7d45c92a3bab40ae8917090dcddfe494',//账号四的好友shareCode，不同好友中间用@符号隔开
  '841aa1159919442f8beb9c3d483fd9fa@8f9286f0ff9240c8a59fcc33335c4eda@5c3eba0f57614ff082ce0f7777ecccba@7d45c92a3bab40ae8917090dcddfe494',//账号五的好友shareCode，不同好友中间用@符号隔开
  '67b4234e22924c528be3a7421094b079@c6380b74b7904d02bbc258c521192d9f@884ac494d8a24c938e66114ad70ae7dd@d653fc9270ea4cdbac17f2ff1a80a1b3',//账号六的好友shareCode，不同好友中间用@符号隔开
  '67b4234e22924c528be3a7421094b079@c6380b74b7904d02bbc258c521192d9f@884ac494d8a24c938e66114ad70ae7dd@d653fc9270ea4cdbac17f2ff1a80a1b3',//账号七的好友shareCode，不同好友中间用@符号隔开
  '67b4234e22924c528be3a7421094b079@c6380b74b7904d02bbc258c521192d9f@884ac494d8a24c938e66114ad70ae7dd@d653fc9270ea4cdbac17f2ff1a80a1b3',//账号八的好友shareCode，不同好友中间用@符号隔开
  '67b4234e22924c528be3a7421094b079@c6380b74b7904d02bbc258c521192d9f@884ac494d8a24c938e66114ad70ae7dd@d653fc9270ea4cdbac17f2ff1a80a1b3',//账号九的好友shareCode，不同好友中间用@符号隔开
  '67b4234e22924c528be3a7421094b079@c6380b74b7904d02bbc258c521192d9f@884ac494d8a24c938e66114ad70ae7dd@d653fc9270ea4cdbac17f2ff1a80a1b3',//账号十的好友shareCode，不同好友中间用@符号隔开
]

// 判断github action里面是否有水果互助码
if (process.env.FruitShareCodes) {
  if (process.env.FRUITSHARECODES.indexOf('&') > -1) {
    console.log(`您的东东农场互助码选择的是用&隔开\n`)
    FruitShareCodes = process.env.FRUITSHARECODES.split('&');
  } else if (process.env.FRUITSHARECODES.indexOf('\n') > -1) {
    console.log(`您的东东农场互助码选择的是用换行隔开\n`)
    FruitShareCodes = process.env.FRUITSHARECODES.split('\n');
  } else {
    FruitShareCodes = process.env.FRUITSHARECODES.split();
  }
} else if (process.env.JD_COOKIE) {
  console.log(`由于您secret里面未提供助力码，故此处运行将会给脚本内置的码进行助力，请知晓！`)
}
for (let i = 0; i < FruitShareCodes.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['FruitShareCode' + index] = FruitShareCodes[i];
}