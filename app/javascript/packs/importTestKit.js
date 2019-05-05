const inputFile = document.getElementById('questionFile')
const { value } = document.getElementById('exam_id')
const { content } = document.querySelector('[name="csrf-token"]')

inputFile.onchange = function (e) {
  const reader = new FileReader()

  reader.onload = async function () {
    const text = reader.result
    const questions = getQuestions(text)
    // const headers = new Headers();

    fetch(`/exams/${value}/import`, {
      method: 'post',
      body: JSON.stringify(questions),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': content
      },
      credentials: 'same-origin'
    }).then(() => window.href = location.href)
  }
  reader.readAsText(this.files[0])
}

const getQuestions = (buffer) => {

  const regex = /(^.+$\n^[+-].+$\n)+/gm
  const questionRegEx = /(^[^+-].+$\n)/gm
  const answersRegEx = /(^[+-].+$\n)/gm
  const myTestObject = []
  let m

  while ((m = regex.exec(buffer)) !== null) {
    const tmp1 = m[0]
    const tmp2 = tmp1.match(questionRegEx)[0]
    const tmp3 = tmp1.match(answersRegEx)
      .map(item => item.trim())
      .map((value) => {
        const sign = value.substr(0, 1) === '+'
        const label = value.substr(1, value.length).trim()
        return { sign, label }
      })
    myTestObject.push({ title: tmp2, answers: tmp3 })
  }
  return myTestObject
}