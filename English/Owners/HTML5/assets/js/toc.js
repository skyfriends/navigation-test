let reading = e => {
  // console.log('--------------------------------------------------')
  let theTarget = e.target
  $(theTarget).css('display', 'block')

  if (e.target.className === 'has-child open') {
    $(theTarget)
      .children('i')
      .css('transform', 'rotate(90deg)')
    $(theTarget)
      .children('i')
      .addClass('open')

    theTarget = e.target
    $(theTarget)
      .next('ul')
      .slideDown(300)

    $(theTarget).unbind('click')
  } else if (e.target.className === 'has-child') {
    $(theTarget).unbind('click')

    theTarget = e.target
  } else if (e.target.className.includes('material-icons has-child')) {
    let chevron = e.target
    if (
      chevron.className === 'material-icons has-child' &&
      chevron.parentElement.className === 'has-child open'
    ) {
      $(chevron)
        .parent()
        .toggleClass('open')
    }

    // console.log('chevron', chevron)
    // console.log('chevronsparent', chevron.parentElement)
    if (chevron.parentElement.className === 'has-child open') {
      // console.log('CHEVRONS PARENT IS HAS CHILD OPEN')
      $(chevron).css('transform', 'rotate(0deg)')
      $(chevron)
        .parent()
        .next('ul')
        .slideUp(300)
      $(chevron)
        .parent()
        .toggleClass('open')
      $(chevron).toggleClass('open')
      $(chevron)
        .parent()
        .on('click', event => {
          $(event.target)
            .next('ul')
            .slideDown(300)
          $(chevron).css('transform', 'rotate(0deg)')

          $(event.target).toggleClass('open')
          $(chevron).toggleClass('open')
        })
    } else if (chevron.parentElement.className === 'has-child') {
      // console.log('CHEVRONS PARENT IS HAS CHILD')
      $(chevron)
        .parent()
        .toggleClass('open')
      $(chevron).toggleClass('open')
      $(chevron).css('transform', 'rotate(90deg)')
      $(chevron)
        .parent()
        .next('ul')
        .slideDown(300)
    } else {
      // console.log('THE LAST ELSE')
      $(chevron).toggleClass('open')
      $(chevron).css('transform', 'rotate(90deg)')
      $(chevron)
        .parent()
        .next('ul')
        .slideDown(300)
      $(chevron)
        .parent()
        .toggleClass('open')
    }

    return
  }
  let scrollDown = hash => {
    location.hash = hash
    window.scrollTo(0, hash)
  }

  let checkClick = e => {
    let tar = e.target
    let tarName = e.target.tagName.toLowerCase()
    console.log('BEFORE IFS ', tarName)
    if (
      tarName === 'a' &&
      tar.parentNode.parentNode.tagName.toLowerCase() === 'ul' &&
      tar.parentNode.id.includes('a')
    ) {
      console.log('TOP LEVEL ^^ ', tar.id)
      return tar.id
    } else if (
      tarName === 'a' &&
      tar.parentNode.parentNode.tagName.toLowerCase() === 'ul' &&
      tar.parentNode.parentNode.parentNode.id.includes('a')
    ) {
      let currentChapter = tar.id.split('#')[0]
      $(thing).load(`${currentChapter} main.container-fluid`)

      let changedId = tar.id.replace(/0.*[#]/, '')
      let makeItSo = async hash => {
        let hashChanger = hash => (location.hash = hash)
        await hashChanger(hash)
        await $(document).ready(() => {
          $('html, body').animate({ scrollTop: $(`#${hash}`).offset().top }, 0)
        })
      }
      return makeItSo(changedId)
    } else if (
      tarName.toLowerCase() === 'li' &&
      !tar.parentNode.parentNode.className
    ) {
      console.log('TOP LI ^^ ', tar.firstChild.id)
      return tar.firstChild.id
    } else if (
      tarName.toLowerCase() === 'a' &&
      tar.parentNode.parentNode.parentNode.parentNode.parentNode.tagName.toLowerCase() ===
        'ul'
    ) {
      console.log('TOP A IN LI ', tar.parentNode.parentNode.parentNode)
      return tar.id
    } else if (
      tarName === 'a' &&
      tar.parentNode.parentNode.lastChild.nextSibling === null &&
      tar.parentNode.parentNode.tagName.toLowerCase() === 'ul' &&
      tar.parentNode.parentNode.parentNode.parentNode.parentNode.id[0] === 'a'
    ) {
      console.log('HIT IF A ID ************', tar.id.replace(/0.*[#]/, ''))
      let currentChapter = tar.id.split('#')[0]
      $(thing).load(`${currentChapter} main.container-fluid`)
      let changedId = tar.id.replace(/0.*[#]/, '')
      let makeItSo = async hash => {
        let hashChanger = hash => (location.hash = hash)
        await hashChanger(hash)
        await $(document).ready(() => {
          $('html, body').animate({ scrollTop: $(`#${hash}`).offset().top }, 0)
        })
      }
      return makeItSo(changedId)
    } else if (
      tarName === 'a' &&
      tar.parentNode.parentNode.lastChild.nextSibling === null &&
      tar.parentNode.parentNode.tagName.toLowerCase() === 'ul' &&
      tar.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id.includes(
        'a'
      )
    ) {
      let currentChapter = tar.id.split('#')[0]
      $(thing).load(`${currentChapter} main.container-fluid`)
      let changedId = tar.id.replace(/0.*[#]/, '')
      let makeItSo = async hash => {
        let hashChanger = hash => (location.hash = hash)
        await hashChanger(hash)
        await $(document).ready(() => {
          $('html, body').animate({ scrollTop: $(`#${hash}`).offset().top }, 0)
        })
      }
      return makeItSo(changedId)
    } else if (tarName === 'li') {
      // console.log('HIT ELSE-IF LI ', tar)
      // return tar.parentNode.parentNode.parentNode.parentNode.id
    } else if (tarName === 'ul' && !tar.className) {
      // console.log('HIT ELSE ', tar)
      return
    }
  }

  let thing = document.getElementById('container-fluid')

  let filePath = theTarget.id.slice(0, 16)
  // if (e.target.nextSibling) {
  checkClick = checkClick(e)

  checkClick
    ? console.log('########CHECKCLICK', checkClick)
    : console.log('#######OG FILEPATH', filePath)

  filePath = checkClick ? checkClick : filePath

  $(thing).load(`${filePath} main.container-fluid`, () => {
    let splitter = e.target.id.split('#')
    let hashValue = splitter.length > 1 ? splitter[1] : null
    // console.log('TARGET ', e.target)

    // e.target.id.length > 16 && hashValue ? scrollDown(hashValue) : null
  })

  let navigation = e => {
    let marker = document.getElementsByClassName('footer-menu')[0]
    // console.log('MARKER', marker)

    let testingLoad = () => {
      console.log('FIELPATH AFTER ', filePath)

      return new Promise(resolve => {
        $(marker).load(`${filePath} .footer-menu > li`, newPrint => {
          // console.log('NEW PRINTNTJNJNTINBITNTINT', newPrint)
          let matched = newPrint.match(
            /<a\s*\w*\s*href\s*=\s*"?\s*([\w\s%#\/\.;:_-]*)\s*"?.*?a>/g
          )
          let figures = matched.filter(match => match.includes('Figure'))
          matched = matched.filter(match => !match.includes('Figure'))

          let newMatched = Array.from(matched)
          let splitUp = newMatched.map(v => v.split('"'))
          let outerSplit = splitUp.map(y => y[1])
          let innerSplit = splitUp.map(
            x => x[2].slice(1, splitUp[1][2].length).split('<')[0]
          )
          let held = []
          held.push(outerSplit, innerSplit, figures)
          resolve(held)
        })
      })
    }

    async function logTest() {
      console.log('held', held)

      const data = await testingLoad()

      let figures = data[2].map(x => x.split('>')[1].split('<')[0])
      let originalFigures = data[2]
      let preFigures = document.getElementsByTagName('a')
      preFigures = Array.from(preFigures)
      preFigures = preFigures.filter(v => v.innerText.includes('Figure'))
      preFigures = preFigures.map(
        (x, i) =>
          (x.outerHTML = `<a id=${preFigures[i].href.split('HTML5/')[1]}
        onclick=reading(event)>
      ${preFigures[i].innerText}</a>`)
      )

      let allCrumbs = document.getElementsByClassName('row breadcrumbs')
      allCrumbs = Array.from(allCrumbs)
      allCrumbs = allCrumbs.map(
        (crumb, i) =>
          (crumb.children[0].children[0].outerHTML = `<a id=${
            crumb.children[0].children[0].href.split('HTML5/')[1]
          } onclick=reading(event)>${allCrumbs[i].innerText}</a>
      `)
      )

      let currentFooter = document.getElementsByClassName('footer-menu')

      let holding = Array.from(currentFooter[0].children)

      let staticFooter = [
        '<< Previous Chapter',
        '< Previous Section',
        'Next Section >',
        'Next Chapter >>'
      ]
      holding = holding.map(
        (v, i) =>
          (v.innerHTML = v.innerHTML.includes('<a')
            ? `<a id=${data[0][i]}
          onclick=reading(event)>
        ${staticFooter[i]}</a>`
            : `<a>${staticFooter[i]}</a>`)
      )
    }

    logTest()
  }
  navigation()
}

var menuText = ''

menuText += '<ul class="sidenav dropable sticky" onclick="blockBreak()">'
menuText += `<li id="a000" onclick="reading(event)"><a id="001_000_001.html">Royal Canin <i class="material-icons has-child" >chevron_right</i></a>`
menuText += '<ul>'
menuText += `<li onclick="reading(event)"><a id="001_000_001.html#d6e23">System Overview</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li id="a001" onclick="reading(event)"><a id="001_001_001.html">General Information <i class="material-icons has-child">chevron_right</i></a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_001_001.html#d6e304">Document Overview</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_001_002.html#id172NEK090PF">Acronyms</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_001_003.html#d6e494">Equipment Description</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_001_003.html#d6e498">Section Overview</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_001_003.html#d6e517">Control Room Console</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_001_003.html#d6e779">Auxiliary Factory Floor Station</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li id="a002" onclick="reading(event)"><a id="001_002_001.html">APM Startup <i class="material-icons has-child">chevron_right</i></a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_002_001.html#d6e814">Overview</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_002_001.html#d6e847">User Accounts</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_002_001.html#d6e860">Windows Operating System User Accounts</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_002_001.html#d6e882">APM Software User Accounts</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_002_001.html#d6e960">Powering Up the Computer, and Logging into Windows</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_002_001.html#d6e1039">Switching APM Software User Types</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li id="a003" onclick="reading(event)"><a id="001_003_001.html">APM Screens <i class="material-icons has-child">chevron_right</i></a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_003_001.html#d6e1154">Information Common to All Screens</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_003_001.html#d6e1158">Section Overview</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_001.html#d6e1187">Header and Status Bar</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_003_001.html#d6e1223">Main Screen Header - Left Zone</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_001.html#d6e1243">Main Screen Header - Mid Zone</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_001.html#d6e1263">Main Screen Header - Right Zone</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_001.html#d6e1283">Status Bar</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_001.html#d6e1299">Graphical Shapes and Cooler Conventions</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_003_001.html#d6e1303">Devices</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_001.html#d6e1377">Process Flows</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_001.html#d6e1415">Hand-Off-Auto and Proportional-Integral-Derivative Faceplate’s</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_003_001.html#d6e1516">HOA Faceplate’s for Motors Driving Fixed-Speed Devices</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_001.html#d6e1868">HOA Faceplate’s for Motors Driving Variable-Speed Devices</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_001.html#d6e2129">HOA Faceplate’s for Gates</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_001.html#d6e2390">PID Faceplate’s for Controlling Flow Rates</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_001.html#d6e2616">PID Faceplate’s for Controlling Temperatures</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_002.html#CECEIDBEF2">Main Screen</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_003_002.html#d6e2873">Section Overview</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_002.html#d6e2889">Screen Regions</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_002.html#d6e2960">Extruder System Function Buttons</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_002.html#d6e3083">General Purpose Function Buttons</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_003.html#BABBFGJJF7">Extruder Overview Screen</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_003_003.html#d6e3320">Section Overview</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_003.html#d6e3354">Entire Screen</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_003.html#d6e3382">Feeder Section</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_003_003.html#CJAJIJGCC2">Gravimetric Feed Mode</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_003.html#d6e3707">Volumetric Feed Mode</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_003.html#d6e3717">Preconditioner Section</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_003.html#CIHCCCJHD5">Extruder Section</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_003.html#d6e4942">Knife Section</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_003.html#d6e5190">Miscellaneous Features</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_004.html#BABBEEJFE0">Extruder Barrel Temperatures Screen</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_003_004.html#d6e5532">Section Overview</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_004.html#d6e5545">Details</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_005.html#id17AIF0F07Y4">Extruder Liquids 1 Screen</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_003_005.html#d6e5748">Section Overview</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_005.html#d6e5781">Details</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_006.html#id17AIF5080HS">Extruder Liquids 2 Screen</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_003_006.html#d6e5996">Section Overview</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_006.html#d6e6006">Details</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_007.html#id17AIFB00SUI">Trends Screen</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_003_007.html#d6e6449">Section Overview</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_007.html#d6e6462">Details</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_008.html#id17AIFE00OYK">Formula Screen</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_003_008.html#d6e6573">Section Overview</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_008.html#d6e6643">Formula Screen</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_008.html#d6e6812">Load Formula Screen</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_008.html#d6e6933">Add/Edit Formula Screen</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_008.html#d6e7016">Creating a Completely New Formula</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_008.html#d6e7090">Creating a New Formula from an Existing Formula</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_008.html#d6e7205">Modifying an Existing Formula</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_008.html#d6e7304">Deleting an Existing Formula</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_008.html#d6e7375">Updating Formula Values with Current PLC Setpoints</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_009.html#id17AIFF008HT">Utility Screen</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_003_009.html#d6e7481">Section Overview</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_009.html#d6e7491">Details</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_010.html#id17AIFF010PF">Maintenance Screen</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_003_010.html#d6e7625">Section Overview</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_010.html#d6e7635">Details</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_011.html#id17AIFG00JPN">Alarm Summary Screen</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_003_011.html#d6e7809">Section Overview</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_011.html#d6e7819">Details</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_012.html#id17AIFG0A07Q">Alarm Log Viewer Screen</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_003_012.html#d6e7908">Section Overview</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_012.html#d6e7915">Details</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_013.html#id17AIFH00H30">Totalizer Screen</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_003_013.html#d6e7984">Section Overview</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_013.html#d6e7991">Details</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_014.html#id17AIFH080RO">Print Data Sheet Screen</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_003_014.html#d6e8073">Section Overview</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_014.html#d6e8080">Details</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_015.html#id17AIFI00DE9">Display Languages switching</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_003_015.html#d6e8140">Section Overview</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_003_015.html#d6e8156">Details</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li id="a004" onclick="reading(event)"><a id="001_004_001.html">Programmable Logic Controller <i class="material-icons has-child">chevron_right</i></a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_004_001.html#d6e8223">Section Overview</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_004_002.html#d6e8268">Definitions</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_004_003.html#d6e8334">Extruder Startup Initial Conditions Checklist</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_004_004.html#d6e8407">Extruder System Normal Startup Sequence</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_004_005.html#d6e8687">Extruder System Normal Operation After Startup</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_004_006.html#d6e8747">Extruder System Normal Shutdown Sequence</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_004_007.html#d6e8927">Extruder System Empty Bins Shutdown Sequence</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_004_008.html#d6e8946">Extruder System Warm Restart Sequence</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_004_009.html#CHDIDIEHC5">Extruder Barrel Flush Sequence</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_004_010.html#CHDIFACEF2">Preconditioner Flush Sequences</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_004_011.html#CHDGIAIHF3">Dry Feed Test Mode Sequence</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_004_012.html#d6e9509">Other Operations</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_004_012.html#d6e9513">Emergency-Stopping</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_004_012.html#d6e9529">Changing the Downspout Position</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_004_012.html#d6e9536">Changing the Knife Speed</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_004_012.html#d6e9543">Recovering from Excessive Extruder Motor Load</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li id="a005" onclick="reading(event)"><a id="001_005_001.html">Alarms <i class="material-icons has-child">chevron_right</i></a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_005_001.html#d6e9573">Chapter Overview</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_005_002.html#d6e9583">Details</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_005_003.html#BABHDDHHA2">Immediate Shutdown Alarms</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_005_004.html#BABGEDBDC8">Quick Shutdown Alarms</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_005_005.html#BABFHFCCJ8">Normal Shutdown Alarms</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_005_006.html#BABFEIEJB9">Annunciation Only Alarms</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li id="a006" onclick="reading(event)"><a id="001_006_001.html">Customer Specific Documents <i class="material-icons has-child">chevron_right</i></a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_006_001.html#System_Technical_Specifications_Overview">System Technical Specification Overview</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_006_002.html#Equipment_Utility_Specifications">Equipment Utility Specifications</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_006_003.html#Engineering_Drawings">Engineering Drawings</a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_006_003.html#Plant_Layout_and_General_Dimension_Drawings">Plant Layout and General Dimension Drawings</a>`
menuText += '</li>'
menuText += `<li onclick="reading(event)"><a id="001_006_003.html#Diagrams_and_Schematics">Diagrams and Schematics</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li id="a007" onclick="reading(event)"><a id="001_007_001.html">Vendor Information <i class="material-icons has-child">chevron_right</i></a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_007_001.html#d6e13681">Vendor Documents</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += `<li id="a008" onclick="reading(event)"><a id="001_008_001.html">Manuals Evaluation Form <i class="material-icons has-child">chevron_right</i></a>`
menuText += '<ul onclick="blockBreak()">'
menuText += `<li onclick="reading(event)"><a id="001_008_001.html#CIAGFIFDG2">(Suggestions for Improvement)</a>`
menuText += '</li>'
menuText += '</ul>'
menuText += '</li>'
menuText += '</ul>'
