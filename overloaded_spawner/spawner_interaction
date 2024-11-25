//server script
BlockEvents.rightClicked('minecraft:spawner', event => {
    const { item, hand, block, server } = event
    let dayCount = (event.level.getDayTime() / 24000)
    let mobType = block.entityData.SpawnData.entity.id.toString()
    if (hand != "MAIN_HAND" ||
        item.id != 'minecraft:bone') return
    event.player.swing(hand, true)
    block.set('kubejs:overloaded_spawner')
    block.mergeEntityData({data: { day:dayCount, mob:mobType }})
    let xp = 1395 / 3 + 1 //level 30 equals 1395 points
    server.runCommandSilent(`summon experience_orb ${block.x} ${block.y} ${block.z} {Value:${xp}}`)
    item.count--
})
