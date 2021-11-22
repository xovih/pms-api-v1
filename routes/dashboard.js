const router = require("express").Router()
const Machine = require("../models/Machine")
const Project = require("../models/Project")
const Sensor = require("../models/Sensor")

// Get All Machine
router.get("/mesin", async (req, res) => {
  try {
    const mesin = await Machine.find({
      line: "integrated"
    })
      .sort({ orderNo: 1 })

    let data = {}

    for (const mes of mesin) {
      let item = {}
      let task = {}

      for (let i = 1; i <= mes.sepurCount; i++) {
        const konter = await Project.findOne(
          { machine: mes._id, sepurNo: i }
        ).sort({ _id: -1 })

        task[i] = konter
      }

      const satus = await Sensor.findOne(
        { machine: mes._id }
      ).sort({ _id: -1 })

      item.machine = mes
      item.task = task
      item.status = satus

      data[mes.dalCode] = item
    }

    return res.status(200).json({
      error: false,
      data
    })
  } catch (err) {
    return res.status(500).json(
      {
        error: true,
        message: "Server Error !",
        detail: err
      }
    )
  }
})

// Post a Machine
router.post("/mesin", async (req, res) => {
  // return res.status(200).json(req.body)
  try {
    const newMachine = new Machine(req.body)

    const mesin = await newMachine.save()

    return res.status(201).json({
      error: false,
      message: "Successfully adding New Machine !",
      data: mesin,
    })
  } catch (err) {
    return res.status(500).json(
      {
        error: true,
        message: "Server Error !",
        detail: err
      }
    )
  }
})

// Post Counter
router.post("/count", async (req, res) => {
  const { noLot, kodeWc, noSepur, qty } = req.body

  try {

    const mesin = await Machine.findOne({ wcCode: kodeWc })
    const idMesin = mesin._id

    const alreadyCreate = await Project.exists({ lotNo: noLot, machine: idMesin })

    if (alreadyCreate) {
      await Project.findOneAndUpdate(
        {
          lotNo: noLot,
          machine: idMesin,
        },
        {
          lotNo: noLot,
          qty: qty,
          machine: idMesin,
          sepurNo: noSepur,

        })
    } else {
      const proyek = new Project({
        lotNo: noLot,
        qty: qty,
        machine: idMesin,
        sepurNo: noSepur,
      })

      await proyek.save()
    }

    if (qty > 0) {
      const sensorExist = await Sensor.exists({ machine: idMesin })

      if (sensorExist) {
        await Sensor.findOneAndUpdate(
          { machine: idMesin },
          { sensorStatus: 1 }
        )
      } else {
        const sensor = new Sensor({
          machine: idMesin,
          sensorStatus: 1
        })

        await sensor.save()
      }
    }

    return res.status(200).json({
      error: false,
      message: `Successfuly count. Lot : ${noLot}`
    })

  } catch (err) {
    return res.status(500).json(
      {
        error: true,
        message: "Server Error !",
        detail: err
      }
    )
  }
})


// Post Status
router.post("/status", async (req, res) => {
  try {
    const { kodeWc, status } = req.body
    const mesin = await Machine.findOne({ wcCode: kodeWc })
    const idMesin = mesin._id

    const alreadyCreate = await Sensor.exists({ machine: idMesin })

    if (alreadyCreate) {
      await Sensor.findOneAndUpdate(
        {
          machine: idMesin,
        },
        {
          sensorStatus: status,
        }
      )
    } else {
      const sensor = new Sensor({
        machine: idMesin,
        sensorStatus: status,
      })

      await sensor.save()
    }

    return res.status(200).json({
      error: false,
      message: `Successfuly change status. WC Code : ${kodeWc}`
    })
  } catch (err) {
    return res.status(500).json(
      {
        error: true,
        message: "Server Error !",
        detail: err
      }
    )
  }
})

module.exports = router