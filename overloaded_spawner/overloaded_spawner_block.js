//startup script
function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

StartupEvents.registry("block", (event) => {
  event
    .create('overloaded_spawner')
    .renderType('cutout')
    .notSolid()
    .blockEntity((be) => {
      be.serverTick(20, 0, (tick) => {
        const { x, y, z } = tick.block
        tick.level.spawnParticles(
          "minecraft:smoke",
          true,
          x + 0.1 * rnd(1, 9),
          y + 0.1 * rnd(1, 5),
          z + 0.1 * rnd(1, 9),
          0,
          0.4,
          0,
          10,
          0.1
        )
        let day = tick.block.entityData.data.day + 1 //add number of days to heal itself
        let dayCount = (tick.level.getDayTime() / 24000)
        let mobType = tick.block.entityData.data.mob
        
        if (day < dayCount) {
          tick.level.getBlock(x, y, z).set("minecraft:spawner")
          tick.level.getBlock(x, y, z).mergeEntityData({SpawnData:{entity:{id:mobType}}})
        }
      })
    })
})
