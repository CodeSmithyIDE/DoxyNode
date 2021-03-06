'use strict'

var tf = require("ishiko-test-framework")
var doxynode = require("../dist/codesmithy-doxynode.js")

module.exports = function(theTestHarness) {
    let testSequence = theTestHarness.appendTestSequence("DoxygenXMLOutput tests")

    new tf.FunctionBasedTest("Creation test 1", DoxygenXMLOutputCreationTest1, testSequence)

    new tf.FunctionBasedTest("initialize test 1", DoxygenXMLOutputInitializeTest1, testSequence)

    new tf.FunctionBasedTest("getListOfClasses test 1", DoxygenXMLOutputGetListOfClassesTest1, testSequence)

    new tf.FunctionBasedTest("readClassDocumentation test 1", DoxygenXMLOutputReadClassDocumentationTest1, testSequence)
}

function DoxygenXMLOutputCreationTest1(resolve, reject)
{
    let xmloutput = new doxynode.DoxygenXMLOutput()
    resolve(tf.TestResultOutcome.ePassed)
}

function DoxygenXMLOutputInitializeTest1(resolve, reject)
{
    let xmloutput = new doxynode.DoxygenXMLOutput()
    xmloutput.initialize(__dirname + "/data/cpp-code-1/xml")
        .then(function() {
            resolve(tf.TestResultOutcome.ePassed)
        })
}

function DoxygenXMLOutputGetListOfClassesTest1(resolve, reject)
{
    let xmloutput = new doxynode.DoxygenXMLOutput()
    xmloutput.initialize(__dirname + "/data/cpp-code-1/xml")
        .then(function() {
            let outcome = tf.TestResultOutcome.eFailed
            let listOfClasses = xmloutput.getListOfClasses()
            if (listOfClasses.length == 1) {
                if (listOfClasses[0] == "Polygon") {
                    outcome = tf.TestResultOutcome.ePassed
                }
            }
            resolve(outcome)
        })
}

function DoxygenXMLOutputReadClassDocumentationTest1(resolve, reject)
{
    let xmloutput = new doxynode.DoxygenXMLOutput()
    xmloutput.initialize(__dirname + "/data/cpp-code-1/xml")
        .then(function() {
            xmloutput.readClassDocumentation("Polygon")
                .then(function(classDocumentation) {
                    let outcome = tf.TestResultOutcome.eFailed
                    if (classDocumentation.name == "Polygon") {
                        outcome = tf.TestResultOutcome.ePassed
                    }
                    resolve(outcome)
                })
        })
}
