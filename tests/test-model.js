﻿(function () {
	'use strict';

	var suite = window.Utils.JustTest.createSuite({ name: 'Testing model changes' }),
		user = { name: 'some', age: 7, address: { street: 'str', apt: 9 } },
		obsrvblUser = window.Observable.from(user);

	window.DataTier.ties.create('userA', obsrvblUser);

	var s1, s2, s3, s4;
	s1 = document.createElement('input');
	s1.dataset.tie = 'userA:name';
	document.body.appendChild(s1);
	s2 = document.createElement('div');
	s2.dataset.tie = 'userA:age';
	document.body.appendChild(s2);
	s3 = document.createElement('div');
	s3.dataset.tie = 'userA:address.street';
	document.body.appendChild(s3);
	s4 = document.createElement('div');
	s4.dataset.tie = 'userA:address.apt';
	document.body.appendChild(s4);

	suite.addTest({ name: 'new model bound' }, function (pass, fail) {
		if (s1.value !== obsrvblUser.name) fail(new Error('expected the content to be updated'));
		if (s2.textContent != obsrvblUser.age) fail(new Error('expected the content to be updated'));
		if (s3.textContent !== obsrvblUser.address.street) fail(new Error('expected the content to be updated'));
		if (s4.textContent != obsrvblUser.address.apt) fail(new Error('expected the content to be updated'));
		pass();
	});

	suite.addTest({ name: 'primitive model changes' }, function (pass, fail) {
		if (s1.value !== obsrvblUser.name) fail(new Error('preliminary check failed'));
		obsrvblUser.name = 'other';
		if (s1.value !== obsrvblUser.name) fail(new Error('expected the content to be "other"'));
		pass();
	});

	suite.addTest({ name: 'deep model changes (graph replace)' }, function (pass, fail) {
		obsrvblUser.address.street = 'Street';

		if (s3.textContent !== obsrvblUser.address.street) fail(new Error('expected the content to be "Street"'));
		pass();
	});

	suite.addTest({ name: 'full model replace (to null)' }, function (pass, fail) {
		var t = window.DataTier.ties.get('userA');
		t.data = null;
		if (s1.value !== '') fail(new Error('expected the content to be emptied'));
		if (s2.textContent !== '') fail(new Error('expected the content to be emptied'));
		if (s3.textContent !== '') fail(new Error('expected the content to be emptied'));
		if (s4.textContent !== '') fail(new Error('expected the content to be emptied'));
		pass();
	});

	suite.addTest({ name: 'full model replace (to new data)' }, function (pass, fail) {
		var t = window.DataTier.ties.get('userA'),
    		obsData = Observable.from({ name: 'something else', age: 6 });
		t.data = obsData;
		if (s1.value !== 'something else') fail(new Error('expected the content to be "something else"'));
		if (s2.textContent !== '6') fail(new Error('expected the content to be "6"'));
		if (s3.textContent !== '') fail(new Error('expected the content to be emptied'));
		if (s4.textContent !== '') fail(new Error('expected the content to be emptied'));
		pass();
	});

	suite.addTest({ name: 'binding view to object' }, function (pass, fail) {
		var t = window.DataTier.ties.get('userA');
		s3.dataset.tie = 'userA:address';
		if (s3.textContent !== '') fail(new Error('expected the content to be empty'));
		t.data.address = { street: 'street name', apt: 17 };
		t.data.address.toString = function () { return 'Street: ' + this.street + '; Apt: ' + this.apt };
		if (s4.textContent !== '17') fail(new Error('expected the content to be 17'));
		if (s3.textContent !== t.data.address.toString()) fail(new Error('expected the content to be string of object'));
		pass();
	});

	suite.run();
})();