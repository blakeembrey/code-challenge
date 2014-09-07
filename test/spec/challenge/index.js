var sinon     = require('sinon');
var expect    = require('chai').expect;
var Challenge = require('../../../lib/challenge');

describe('challenge', function () {
  var challenge;

  beforeEach(function () {
    challenge = new Challenge();
  });

  describe('define an exercise', function () {
    var exercise;

    beforeEach(function () {
      exercise = challenge.exercise('test');
    });

    it('should create a exercise instance', function () {
      expect(exercise).to.be.an.instanceOf(challenge.Exercise);
      expect(exercise.name).to.equal('test');
      expect(challenge.exercises).to.have.length(1);
      expect(challenge.exercises[0]).to.equal(exercise);
    });

    it('should run a task', function () {
      var spy = sinon.spy(function (done) {
        return process.nextTick(done);
      });

      exercise.add('test', spy);

      return exercise
        .start('test')
        .then(function () {
          expect(spy).to.have.been.calledOnce;
        });
    });

    it('should reject the promise when an error occurs', function () {
      var spy = sinon.spy(function () {
        throw new Error('test');
      });

      exercise.add('test', spy);

      return expect(exercise.start('test')).to.be.rejectedWith(Error, 'test');
    });

    describe('task arguments', function () {
      it('should pass arguments as the context', function () {
        var spy = sinon.spy(function (done) {
          expect(this._).to.deep.equal([1, 2, 3]);

          return process.nextTick(done);
        });

        exercise.add('dep', spy);
        exercise.add('test', ['dep'], spy);

        return exercise
          .start('test', [1, 2, 3])
          .then(function () {
            expect(exercise._).to.not.exist;
            expect(spy).to.have.been.calledTwice;
          });
      });

      it('should set arguments to an empty array when not passed', function () {
        var spy = sinon.spy(function (done) {
          expect(this._).to.deep.equal([]);

          return process.nextTick(done);
        });

        exercise.add('test', spy);

        return exercise
          .start('test')
          .then(function () {
            expect(exercise._).to.not.exist;
            expect(spy).to.have.been.calledOnce;
          });
      });
    });
  });
});
