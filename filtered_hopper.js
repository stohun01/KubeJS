//startup_scripts
//credit: based on a script by DevDyna https://github.com/DevDyna/kubejs-testing/blob/main/startup_scripts/blockUtility/Crucible.js
const $IntegerProperty = Java.loadClass(
  "net.minecraft.world.level.block.state.properties.IntegerProperty"
)

let increment = (input) => {
  let num = Number(input)
  num += 1
  return num.toString()
}

function hopper(name, input, output) {
  StartupEvents.registry("block", (event) => {
    event
      .create(name)
      .property($IntegerProperty.create("souls", 0, 8))
      .defaultState((state) => {
        state.set($IntegerProperty.create("souls", 0, 8), 0)
      })
      .blockEntity((be) => {
        be.serverTick(20, 0, (tick) => {
          const { x, y, z } = tick.block
          if (
            tick.level.getBlock(x, y - 1, z) == "supplementaries:urn" &&
            tick.level.getBlock(x, y, z).properties.get("souls") < 8
          ) {
            tick.level
              .getEntitiesWithin(
                AABB.of(x, y + 0.5, z, x + 1, y + 1, z + 1)
              )
              .forEach((entity) => {
                if (entity.type != "minecraft:item") return

                if (entity.item == input) {
                  entity.setRemoved("unloaded_to_chunk")
                  let max = entity.item.count > 1 ? entity.item.count : 1
                  for (let i = 0; i < max; i++) {
                    tick.level.getBlock(x, y, z).set("kubejs:filtered_hopper", {souls: increment(tick.level.getBlock(x, y, z).properties.get("souls").toLowerCase())})
                    tick.block.popItemFromFace(output, Direction.UP)
                    tick.block.popItemFromFace("kubejs:soul_urn", Direction.DOWN)
                    tick.level.getBlock(x, y - 1, z).set("air")
                  }
                }
              })
            }
        })
      })
      .box(0, 4, 0, 2, 16, 16)
      .box(2, 4, 2, 14, 8, 14)
      .box(14, 4, 0, 16, 16, 16)
      .box(2, 4, 0, 14, 16, 2)
      .box(2, 4, 14, 14, 16, 16)
      .box(5, 0, 5, 11, 4, 11)
      .item((item) => {
        item.modelJson({
          parent: "kubejs:item/filtered_hopper",
        })
      }).blockstateJson = {
      variants: {
        "souls=0": { model: "minecraft:block/cauldron" },
        "souls=1": { model: "kubejs:block/filtered_hopper" },
        "souls=2": { model: "kubejs:block/filtered_hopper" },
        "souls=3": { model: "kubejs:block/filtered_hopper" },
        "souls=4": { model: "kubejs:block/filtered_hopper" },
        "souls=5": { model: "kubejs:block/filtered_hopper" },
        "souls=6": { model: "kubejs:block/filtered_hopper" },
        "souls=7": { model: "kubejs:block/filtered_hopper" }
      },
    }
  })
}
hopper("kubejs:filtered_hopper", "create:cinder_flour", "kubejs:hellfire_dust")
