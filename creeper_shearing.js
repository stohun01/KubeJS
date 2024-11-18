//server_scripts
//use shears to defuse a creeper dropping item. requires Apathy and the apathy-mobs.json
//note: currently if a Creeper's fuse has started it can still explode even if snipped. Once the fuse dissipates the Creeper will be fully passive
let ObjectiveCriteria = Java.loadClass("net.minecraft.world.scores.criteria.ObjectiveCriteria")

ItemEvents.entityInteracted((event) => {
    const {item, hand, target, level, server, player} = event
    const {x, y, z} = target
    if(target.persistentData.snipped == 1){event.cancel()}
    if(
        target.type == 'minecraft:creeper' &&
        hand == 'main_hand' && 
        item.id == 'minecraft:shears'
        ){
            let scoreboard = level.getScoreboard()
            let objective = scoreboard.getObjective("snip")
            if (!objective){
                scoreboard.addObjective("snip", ObjectiveCriteria.DUMMY, Component.of("snip"), ObjectiveCriteria.DUMMY.getDefaultRenderType())
            }
            player.swing(hand, true)
            item.damageValue++
            target.playSound('entity.sheep.shear', 0.3, 1)
            target.persistentData.snipped = 1
            target.mergeNbt('{Tags:["snipped"]}')
            server.runCommandSilent(`execute in ${level.dimension} positioned ${x} ${y} ${z} run scoreboard players set @e[distance=..2,type=minecraft:creeper,tag=snipped] snip 1`)
            level.spawnParticles('minecraft:block emerald_block', true, target.x, target.y + 0.7, target.z, 0.2, 0.2, 0.2, 20, 0.001)
            level.getBlock(x - 0.5, y, z - 0.5).popItem('kubejs:creeper_oyster')
    }
})
