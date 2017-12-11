const generateFlowTypesFromJson = require('../generateFlowTypesFromJson');

describe('generateFlowTypesFromJson', () => {
  it('should print JSON to a valid Flow type', () => {
    expect(
      generateFlowTypesFromJson(
        {
          testString: 'test',
          testBool: false,
          testNum: 123,
          testNull: null,
          testObj: {
            str: 'hello',
            bool: true,
            num: 12324,
            not: null
          },
          testObjList: [
            {
              str: 'hello',
              bool: true,
              num: 12324,
              not: null
            }
          ],
          testPrimitiveList: [123, 'test']
        },
        {
          name: 'TestType'
        }
      )
    ).toMatchSnapshot();
  });

  it('should find lists of objects, remove duplicates, unify all objects to a single object, and add maybe types to keys not present in all objects', () => {
    expect(
      generateFlowTypesFromJson(
        {
          testList: [
            { test: '123' },
            { test: '456', maybeProp: 123 },
            {
              test: '789',
              anotherMaybeProp: 'testing',
              maybeObj: { test: '123' }
            },
            {
              test: '789',
              nestedList: [
                { prop: 'test', maybeProp: 123456 },
                { prop: 'test' }
              ]
            }
          ]
        },
        {
          name: 'TestType'
        }
      )
    ).toMatchSnapshot();
  });

  it('should handle nested arrays that are sometimes empty', () => {
    expect(
      generateFlowTypesFromJson(
        {
          testList: [
            { test: '123', nestedList: [] },
            { test: '456', maybeProp: 123, nestedList: [] },
            {
              test: '789',
              anotherMaybeProp: 'testing',
              maybeObj: { test: '123' },
              nestedList: []
            },
            {
              test: '789',
              nestedList: [
                { prop: 'test', maybeProp: 123456 },
                { prop: 'test' }
              ]
            }
          ]
        },
        {
          name: 'TestType'
        }
      )
    ).toMatchSnapshot();
  });

  describe('Realistic examples', () => {
    describe('API responses', () => {
      test('api response should yield a sensible Flow type', () => {
        expect(
          generateFlowTypesFromJson(
            {
              data: {
                notifications: {
                  count: 123,
                  edges: [
                    {
                      cursor: '1234',
                      node: {
                        id: 1234,
                        message: 'hejsan'
                      }
                    },
                    {
                      cursor: '1234',
                      node: {
                        id: 1234,
                        message: null
                      }
                    }
                  ]
                },
                user: {
                  id: 1234,
                  firstName: 'Mrs',
                  lastName: 'Test',
                  email: 'test@test.com',
                  friends: [
                    {
                      id: 1234,
                      firstName: 'Friend',
                      lastName: 'One',
                      email: 'friend@friend.com',
                      isOnline: true,
                      lastMessaged: 123455
                    },
                    {
                      id: 1234,
                      firstName: 'Friend',
                      lastName: 'One',
                      email: 'friend@friend.com',
                      isOnline: false,
                      lastMessaged: null
                    },
                    {
                      id: 1234,
                      firstName: 'Friend',
                      lastName: 'One'
                    }
                  ]
                }
              }
            },
            {
              name: 'UserAPIResponse'
            }
          )
        ).toMatchSnapshot();
      });
    });
    test('api response should yield a sensible Flow type', () => {
      expect(
        generateFlowTypesFromJson(
          [
            {
              name: 'Test',
              age: 123
            },
            {
              name: 'Test',
              age: null
            },
            {
              name: 'Test',
              email: 'email@email.com'
            }
          ],
          {
            name: 'UserAPIResponse',
            readOnly: true
          }
        )
      ).toMatchSnapshot();
    });

    it('should handle complex response', () => {
      expect(
        generateFlowTypesFromJson({
          id: 192198,
          title: '123qweqweqwe',
          contentHTML:
            '<!-- EDITOR:DRAFT--><p></p><div data-custom-block-type="atomic"><img\n          role="presentation"\n          src="/unikum-dev//content/content/4bn3/192198-deafe01a-6ae1-450a-ab74-adb2785740ad.png"\n          \n          \n          data-src="/unikum-dev//content/content/4bn3/192198-deafe01a-6ae1-450a-ab74-adb2785740ad.png"\n          >a</img> </div><p></p><p></p><p></p><div data-custom-block-type="atomic"><audio controls="" data-custom-entity-type="AUDIO" src="/unikum-dev//content/content/4bn3/192198-14a54c6e-79c1-4491-ae47-a5ece35bf0e7.mp3" data-url="/unikum-dev//content/content/4bn3/192198-14a54c6e-79c1-4491-ae47-a5ece35bf0e7.mp3"> </audio></div><p></p>',
          state: 'PUBLISHED',
          noOfInvitedReaders: 6,
          noOfSeen: 0,
          author: {
            id: 84088,
            name: 'Jens Lekman',
            avatar: '/userimages/jens_1512474200089.png',
            sortBy: 'Lekman'
          },
          context: {
            id: 38182,
            name: 'Orrarna',
            avatar: null,
            sortBy: 'Orrarna'
          },
          created: 1512741737623,
          lastEdited: 1512742103992,
          published: 1512741767245,
          allowColleguesToEdit: false,
          allowComments: true,
          seen: true,
          visibleTo: [
            'MENTOR_FOR',
            'STAFF_IN_SCHOOL',
            'STUDENT_IN_CLASS',
            'EXTERNAL_USER_IN_SCHOOL'
          ],
          comments: [],
          positions: [],
          ingressImage: {
            path:
              'http://localhost:8080/unikum-dev/content/blog/kommunen/forskolan/orrarna/192198_1512741738143_scaled.png',
            id: 192200
          },
          images: [
            {
              path:
                'http://localhost:8080/unikum-dev/content/blog/kommunen/forskolan/orrarna/192198_1512741738143_scaled.png',
              thumbnailPath:
                'http://localhost:8080/unikum-dev/content/blog/kommunen/forskolan/orrarna/192198_1512741738143_thumb.png'
            }
          ],
          attachments: [],
          connectedTags: [],
          connectedCurriculums: [],
          connectedLpps: [],
          connectedPoints: [
            {
              id: 402231847,
              body:
                'förmåga att ta hänsyn till och leva sig in i andra människors situation samt vilja att hjälpa andra,',
              type: 'laroplan'
            },
            {
              id: 402231848,
              body:
                'sin förmåga att upptäcka, reflektera över och ta ställning till olika etiska dilemman och livsfrågor i vardagen,',
              type: 'laroplan'
            },
            {
              id: 402231849,
              body:
                'förståelse för att alla människor har lika värde oberoende av social bakgrund och oavsett kön, etnisk tillhörighet, religion eller annan trosuppfattning, sexuell läggning eller funktionsnedsättning, och',
              type: 'laroplan'
            }
          ],
          allowedToEdit: true,
          allowedToCopy: true,
          allowedToDelete: true,
          allowedCurriculumConnect: true,
          allowedToConnect: true,
          cursor: '192198'
        })
      ).toMatchSnapshot();
    });

    it('should handle a complex response', function () {
      expect(generateFlowTypesFromJson({
        "list": [
          {
            "id": 191947,
            "title": "qweqwe",
            "contentHTML": "<!-- EDITOR:DRAFT--><p>qweqweqweqw</p><p></p><p></p><p></p>",
            "state": "PUBLISHED",
            "noOfInvitedReaders": 6,
            "noOfSeen": 0,
            "author": {
              "id": 84088,
              "name": "Jens Lekman",
              "avatar": "/userimages/jens_1512474200089.png",
              "sortBy": "Lekman"
            },
            "context": {
              "id": 38182,
              "name": "Orrarna",
              "avatar": null,
              "sortBy": "Orrarna"
            },
            "created": 1512727242641,
            "lastEdited": 1512727242687,
            "published": 1512977788851,
            "allowColleguesToEdit": false,
            "allowComments": true,
            "seen": true,
            "visibleTo": [
              "MENTOR_FOR",
              "STAFF_IN_SCHOOL",
              "STUDENT_IN_CLASS",
              "EXTERNAL_USER_IN_SCHOOL"
            ],
            "comments": [],
            "positions": [],
            "ingressImage": {
              "path": "http://localhost:8080/unikum-dev/content/blog/kommunen/forskolan/orrarna/191947_1512727243951_scaled.png",
              "id": 191949
            },
            "images": [],
            "attachments": [],
            "connectedTags": [],
            "connectedCurriculums": [],
            "connectedLpps": [],
            "connectedPoints": [],
            "allowedToEdit": true,
            "allowedToCopy": true,
            "allowedToDelete": true,
            "allowedCurriculumConnect": true,
            "allowedToConnect": true,
            "cursor": "191947"
          },
          {
            "id": 192198,
            "title": "123qweqweqwe",
            "contentHTML": "<!-- EDITOR:DRAFT--><p></p><div data-custom-block-type=\"atomic\"><img\n          role=\"presentation\"\n          src=\"/unikum-dev//content/content/4bn3/192198-deafe01a-6ae1-450a-ab74-adb2785740ad.png\"\n          \n          \n          data-src=\"/unikum-dev//content/content/4bn3/192198-deafe01a-6ae1-450a-ab74-adb2785740ad.png\"\n          >a</img> </div><p></p><p></p><p></p><div data-custom-block-type=\"atomic\"><audio controls=\"\" data-custom-entity-type=\"AUDIO\" src=\"/unikum-dev//content/content/4bn3/192198-14a54c6e-79c1-4491-ae47-a5ece35bf0e7.mp3\" data-url=\"/unikum-dev//content/content/4bn3/192198-14a54c6e-79c1-4491-ae47-a5ece35bf0e7.mp3\"> </audio></div><p></p>",
            "state": "PUBLISHED",
            "noOfInvitedReaders": 6,
            "noOfSeen": 0,
            "author": {
              "id": 84088,
              "name": "Jens Lekman",
              "avatar": "/userimages/jens_1512474200089.png",
              "sortBy": "Lekman"
            },
            "context": {
              "id": 38182,
              "name": "Orrarna",
              "avatar": null,
              "sortBy": "Orrarna"
            },
            "created": 1512741737623,
            "lastEdited": 1512742103992,
            "published": 1512741767245,
            "allowColleguesToEdit": false,
            "allowComments": true,
            "seen": true,
            "visibleTo": [
              "MENTOR_FOR",
              "STAFF_IN_SCHOOL",
              "STUDENT_IN_CLASS",
              "EXTERNAL_USER_IN_SCHOOL"
            ],
            "comments": [],
            "positions": [],
            "ingressImage": {
              "path": "http://localhost:8080/unikum-dev/content/blog/kommunen/forskolan/orrarna/192198_1512741738143_scaled.png",
              "id": 192200
            },
            "images": [],
            "attachments": [],
            "connectedTags": [],
            "connectedCurriculums": [],
            "connectedLpps": [],
            "connectedPoints": [],
            "allowedToEdit": true,
            "allowedToCopy": true,
            "allowedToDelete": true,
            "allowedCurriculumConnect": true,
            "allowedToConnect": true,
            "cursor": "192198"
          },
          {
            "id": 191875,
            "title": "Jhhhjj",
            "contentHTML": "<!-- EDITOR:DRAFT--><p>Uhhhjhjlökjk</p><p></p><p></p><p>jhhhkkjgg</p><p></p><p></p><p></p><div data-custom-block-type=\"atomic\"><img\n          role=\"presentation\"\n          src=\"/unikum-dev//content/content/4bn3/191875-50e042a5-5a80-4ec1-a86b-e80507703e1a.jpg\"\n          \n          \n          data-src=\"/unikum-dev//content/content/4bn3/191875-50e042a5-5a80-4ec1-a86b-e80507703e1a.jpg\" data-caption=\"Hgfhbcgjk\" data-alignment=\"center\"\n          > </img></div><p>Hghejgg</p><p>Hhhhj</p><p></p><p></p><p>Gffgg</p>",
            "state": "PUBLISHED",
            "noOfInvitedReaders": 6,
            "noOfSeen": 0,
            "author": {
              "id": 84088,
              "name": "Jens Lekman",
              "avatar": "/userimages/jens_1512474200089.png",
              "sortBy": "Lekman"
            },
            "context": {
              "id": 38182,
              "name": "Orrarna",
              "avatar": null,
              "sortBy": "Orrarna"
            },
            "created": 1512726394405,
            "lastEdited": 1512726727211,
            "published": 1512726727330,
            "allowColleguesToEdit": false,
            "allowComments": true,
            "seen": true,
            "visibleTo": [
              "MENTOR_FOR",
              "STAFF_IN_SCHOOL",
              "STUDENT_IN_CLASS",
              "EXTERNAL_USER_IN_SCHOOL"
            ],
            "comments": [],
            "positions": [],
            "ingressImage": {
              "path": "http://localhost:8080/unikum-dev/content/blog/kommunen/forskolan/orrarna/191875_1512726395811_scaled.jpg",
              "id": 191877
            },
            "images": [],
            "attachments": [],
            "connectedTags": [],
            "connectedCurriculums": [],
            "connectedLpps": [],
            "connectedPoints": [],
            "allowedToEdit": true,
            "allowedToCopy": true,
            "allowedToDelete": true,
            "allowedCurriculumConnect": true,
            "allowedToConnect": true,
            "cursor": "191875"
          },
          {
            "id": 191873,
            "title": "Tjabba",
            "contentHTML": "<!-- EDITOR:DRAFT--><p>qweqwe</p><p></p><p>213q</p><p>w</p><p>qwe</p><p>q</p><p>we</p><p></p><p></p><p></p><p></p>",
            "state": "DRAFT",
            "noOfInvitedReaders": 6,
            "noOfSeen": 0,
            "author": {
              "id": 84088,
              "name": "Jens Lekman",
              "avatar": "/userimages/jens_1512474200089.png",
              "sortBy": "Lekman"
            },
            "context": {
              "id": 38182,
              "name": "Orrarna",
              "avatar": null,
              "sortBy": "Orrarna"
            },
            "created": 1512726117509,
            "lastEdited": 1512726117548,
            "published": null,
            "allowColleguesToEdit": false,
            "allowComments": true,
            "seen": true,
            "visibleTo": [
              "MENTOR_FOR",
              "STAFF_IN_SCHOOL",
              "STUDENT_IN_CLASS",
              "EXTERNAL_USER_IN_SCHOOL"
            ],
            "comments": [],
            "positions": [],
            "ingressImage": null,
            "images": [],
            "attachments": [],
            "connectedTags": [],
            "connectedCurriculums": [],
            "connectedLpps": [],
            "connectedPoints": [],
            "allowedToEdit": true,
            "allowedToCopy": true,
            "allowedToDelete": true,
            "allowedCurriculumConnect": true,
            "allowedToConnect": true,
            "cursor": "191873"
          },
          {
            "id": 191839,
            "title": "qweqwe",
            "contentHTML": "<!-- EDITOR:DRAFT--><p>qweqwe</p><p></p><p></p><p></p><div data-custom-block-type=\"atomic\"> </div><p></p>",
            "state": "PUBLISHED",
            "noOfInvitedReaders": 6,
            "noOfSeen": 0,
            "author": {
              "id": 84088,
              "name": "Jens Lekman",
              "avatar": "/userimages/jens_1512474200089.png",
              "sortBy": "Lekman"
            },
            "context": {
              "id": 38182,
              "name": "Orrarna",
              "avatar": null,
              "sortBy": "Orrarna"
            },
            "created": 1512724736443,
            "lastEdited": 1512724765419,
            "published": 1512724765503,
            "allowColleguesToEdit": false,
            "allowComments": true,
            "seen": true,
            "visibleTo": [
              "MENTOR_FOR",
              "STAFF_IN_SCHOOL",
              "STUDENT_IN_CLASS",
              "EXTERNAL_USER_IN_SCHOOL"
            ],
            "comments": [],
            "positions": [],
            "ingressImage": null,
            "images": [],
            "attachments": [],
            "connectedTags": [],
            "connectedCurriculums": [],
            "connectedLpps": [],
            "connectedPoints": [],
            "allowedToEdit": true,
            "allowedToCopy": true,
            "allowedToDelete": true,
            "allowedCurriculumConnect": true,
            "allowedToConnect": true,
            "cursor": "191839"
          },
          {
            "id": 191785,
            "title": "qweqwe",
            "contentHTML": "<!-- EDITOR:DRAFT--><p>qweqwe</p><p></p><p></p><p></p>",
            "state": "DRAFT",
            "noOfInvitedReaders": 6,
            "noOfSeen": 0,
            "author": {
              "id": 84088,
              "name": "Jens Lekman",
              "avatar": "/userimages/jens_1512474200089.png",
              "sortBy": "Lekman"
            },
            "context": {
              "id": 38182,
              "name": "Orrarna",
              "avatar": null,
              "sortBy": "Orrarna"
            },
            "created": 1512723148432,
            "lastEdited": 1512723148523,
            "published": null,
            "allowColleguesToEdit": false,
            "allowComments": true,
            "seen": true,
            "visibleTo": [
              "MENTOR_FOR",
              "STAFF_IN_SCHOOL",
              "STUDENT_IN_CLASS",
              "EXTERNAL_USER_IN_SCHOOL"
            ],
            "comments": [],
            "positions": [],
            "ingressImage": null,
            "images": [],
            "attachments": [],
            "connectedTags": [],
            "connectedCurriculums": [],
            "connectedLpps": [],
            "connectedPoints": [],
            "allowedToEdit": true,
            "allowedToCopy": true,
            "allowedToDelete": true,
            "allowedCurriculumConnect": true,
            "allowedToConnect": true,
            "cursor": "191785"
          },
          {
            "id": 191255,
            "title": "",
            "contentHTML": "<p></p><p></p><p></p><p>qwe</p><p>qwe</p><p>qw</p><p>e</p><p>qwe</p><p></p><p>qwe</p><p>q</p><p>we</p><p></p><p></p><p>qw</p><p></p><p>qwe</p><p></p><p>qwe</p><p></p><p>qwe</p>",
            "state": "DRAFT",
            "noOfInvitedReaders": 6,
            "noOfSeen": 0,
            "author": {
              "id": 84088,
              "name": "Jens Lekman",
              "avatar": "/userimages/jens_1512474200089.png",
              "sortBy": "Lekman"
            },
            "context": {
              "id": 38182,
              "name": "Orrarna",
              "avatar": null,
              "sortBy": "Orrarna"
            },
            "created": 1512660645580,
            "lastEdited": 1512660647660,
            "published": null,
            "allowColleguesToEdit": false,
            "allowComments": true,
            "seen": true,
            "visibleTo": [
              "MENTOR_FOR",
              "STAFF_IN_SCHOOL",
              "STUDENT_IN_CLASS",
              "EXTERNAL_USER_IN_SCHOOL"
            ],
            "comments": [],
            "positions": [],
            "ingressImage": null,
            "images": [],
            "attachments": [],
            "connectedTags": [],
            "connectedCurriculums": [],
            "connectedLpps": [],
            "connectedPoints": [],
            "allowedToEdit": true,
            "allowedToCopy": true,
            "allowedToDelete": true,
            "allowedCurriculumConnect": true,
            "allowedToConnect": true,
            "cursor": "191255"
          },
          {
            "id": 191227,
            "title": "qweqwe",
            "contentHTML": "<p>TJENARE</p><div data-custom-block-type=\"atomic\"><img\n          role=\"presentation\"\n          src=\"/unikum-dev//content/content/4bn3/191227-ede520b5-54e5-4128-8e69-f5447fa98880.png\"\n          \n          \n          data-src=\"/unikum-dev//content/content/4bn3/191227-ede520b5-54e5-4128-8e69-f5447fa98880.png\" data-caption=\"TJENARE\"\n          > </img></div><p>QWEQWEQWQWE</p><p></p><p></p><p></p>",
            "state": "PUBLISHED",
            "noOfInvitedReaders": 6,
            "noOfSeen": 0,
            "author": {
              "id": 84088,
              "name": "Jens Lekman",
              "avatar": "/userimages/jens_1512474200089.png",
              "sortBy": "Lekman"
            },
            "context": {
              "id": 38182,
              "name": "Orrarna",
              "avatar": null,
              "sortBy": "Orrarna"
            },
            "created": 1512660112786,
            "lastEdited": 1512660144360,
            "published": 1512660144452,
            "allowColleguesToEdit": false,
            "allowComments": true,
            "seen": true,
            "visibleTo": [
              "MENTOR_FOR",
              "STAFF_IN_SCHOOL",
              "STUDENT_IN_CLASS",
              "EXTERNAL_USER_IN_SCHOOL"
            ],
            "comments": [],
            "positions": [],
            "ingressImage": {
              "path": "http://localhost:8080/unikum-dev/content/blog/kommunen/forskolan/orrarna/191227_1512660114078_scaled.png",
              "id": 191229
            },
            "images": [],
            "attachments": [],
            "connectedTags": [],
            "connectedCurriculums": [],
            "connectedLpps": [],
            "connectedPoints": [],
            "allowedToEdit": true,
            "allowedToCopy": true,
            "allowedToDelete": true,
            "allowedCurriculumConnect": true,
            "allowedToConnect": true,
            "cursor": "191227"
          },
          {
            "id": 191128,
            "title": "qweqwe",
            "contentHTML": "<p>qweqewqw</p><p></p><p></p>",
            "state": "DRAFT",
            "noOfInvitedReaders": 6,
            "noOfSeen": 0,
            "author": {
              "id": 84088,
              "name": "Jens Lekman",
              "avatar": "/userimages/jens_1512474200089.png",
              "sortBy": "Lekman"
            },
            "context": {
              "id": 38182,
              "name": "Orrarna",
              "avatar": null,
              "sortBy": "Orrarna"
            },
            "created": 1512659643108,
            "lastEdited": 1512659643151,
            "published": null,
            "allowColleguesToEdit": false,
            "allowComments": true,
            "seen": true,
            "visibleTo": [
              "MENTOR_FOR",
              "STAFF_IN_SCHOOL",
              "STUDENT_IN_CLASS",
              "EXTERNAL_USER_IN_SCHOOL"
            ],
            "comments": [],
            "positions": [],
            "ingressImage": {
              "path": "http://localhost:8080/unikum-dev/content/blog/kommunen/forskolan/orrarna/191128_1512659644405_scaled.png",
              "id": 191130
            },
            "images": [],
            "attachments": [],
            "connectedTags": [],
            "connectedCurriculums": [],
            "connectedLpps": [],
            "connectedPoints": [],
            "allowedToEdit": true,
            "allowedToCopy": true,
            "allowedToDelete": true,
            "allowedCurriculumConnect": true,
            "allowedToConnect": true,
            "cursor": "191128"
          },
          {
            "id": 191124,
            "title": "qweqwe",
            "contentHTML": "<p>qweqwe</p><p></p><p></p>",
            "state": "DRAFT",
            "noOfInvitedReaders": 6,
            "noOfSeen": 0,
            "author": {
              "id": 84088,
              "name": "Jens Lekman",
              "avatar": "/userimages/jens_1512474200089.png",
              "sortBy": "Lekman"
            },
            "context": {
              "id": 38182,
              "name": "Orrarna",
              "avatar": null,
              "sortBy": "Orrarna"
            },
            "created": 1512659412097,
            "lastEdited": 1512659412197,
            "published": null,
            "allowColleguesToEdit": false,
            "allowComments": true,
            "seen": true,
            "visibleTo": [
              "MENTOR_FOR",
              "STAFF_IN_SCHOOL",
              "STUDENT_IN_CLASS",
              "EXTERNAL_USER_IN_SCHOOL"
            ],
            "comments": [],
            "positions": [],
            "ingressImage": {
              "path": "http://localhost:8080/unikum-dev/content/blog/kommunen/forskolan/orrarna/191124_1512659413558_scaled.png",
              "id": 191126
            },
            "images": [],
            "attachments": [],
            "connectedTags": [],
            "connectedCurriculums": [],
            "connectedLpps": [],
            "connectedPoints": [],
            "allowedToEdit": true,
            "allowedToCopy": true,
            "allowedToDelete": true,
            "allowedCurriculumConnect": true,
            "allowedToConnect": true,
            "cursor": "191124"
          },
          {
            "id": 190914,
            "title": "qweqwe",
            "contentHTML": "<p>qweqweqwe</p><p></p><p></p><p></p>",
            "state": "DRAFT",
            "noOfInvitedReaders": 6,
            "noOfSeen": 0,
            "author": {
              "id": 84088,
              "name": "Jens Lekman",
              "avatar": "/userimages/jens_1512474200089.png",
              "sortBy": "Lekman"
            },
            "context": {
              "id": 38182,
              "name": "Orrarna",
              "avatar": null,
              "sortBy": "Orrarna"
            },
            "created": 1512655219324,
            "lastEdited": 1512655219395,
            "published": null,
            "allowColleguesToEdit": false,
            "allowComments": true,
            "seen": true,
            "visibleTo": [
              "MENTOR_FOR",
              "STAFF_IN_SCHOOL",
              "STUDENT_IN_CLASS",
              "EXTERNAL_USER_IN_SCHOOL"
            ],
            "comments": [],
            "positions": [],
            "ingressImage": {
              "path": "http://localhost:8080/unikum-dev/content/blog/kommunen/forskolan/orrarna/190914_1512655220794_scaled.png",
              "id": 190916
            },
            "images": [],
            "attachments": [],
            "connectedTags": [],
            "connectedCurriculums": [],
            "connectedLpps": [],
            "connectedPoints": [],
            "allowedToEdit": true,
            "allowedToCopy": true,
            "allowedToDelete": true,
            "allowedCurriculumConnect": true,
            "allowedToConnect": true,
            "cursor": "190914"
          },
          {
            "id": 190821,
            "title": "Tjenare",
            "contentHTML": "<p>Tjeenbabaebqwbeqew213qweqwe</p>",
            "state": "SENT",
            "noOfInvitedReaders": 7,
            "noOfSeen": 1,
            "author": {
              "id": 28403,
              "name": "Root Admin",
              "avatar": null,
              "sortBy": "Admin"
            },
            "context": {
              "id": 38182,
              "name": "Orrarna",
              "avatar": null,
              "sortBy": "Orrarna"
            },
            "created": 1512650547468,
            "lastEdited": 1512650563187,
            "published": 1512650563217,
            "allowColleguesToEdit": true,
            "allowComments": true,
            "seen": true,
            "visibleTo": [
              "MENTOR_FOR",
              "STAFF_IN_SCHOOL",
              "STUDENT_IN_CLASS",
              "EXTERNAL_USER_IN_SCHOOL"
            ],
            "comments": [],
            "positions": [],
            "ingressImage": {
              "path": "http://localhost:8080/unikum-dev/content/blog/kommunen/forskolan/orrarna/190821_1512650559812_scaled.png",
              "id": 190822
            },
            "images": [],
            "attachments": [],
            "connectedTags": [],
            "connectedCurriculums": [],
            "connectedLpps": [],
            "connectedPoints": [],
            "allowedToEdit": true,
            "allowedToCopy": true,
            "allowedToDelete": false,
            "allowedCurriculumConnect": true,
            "allowedToConnect": true,
            "cursor": "190821"
          },
          {
            "id": 190740,
            "title": "TJenare",
            "contentHTML": "<p>hejsan på dejsan :)</p><p></p><p>Hahha</p><p></p><p></p><p></p><p>qwe</p><p></p><p></p><p></p><div data-custom-block-type=\"atomic\"><img\n          role=\"presentation\"\n          src=\"/unikum-dev//content/content/4bn3/190740-e0c35744-88c0-4ce2-8c1c-d564912cfea9.png\"\n          \n          \n          data-src=\"/unikum-dev//content/content/4bn3/190740-e0c35744-88c0-4ce2-8c1c-d564912cfea9.png\" data-caption=\"Hejsan på dejsan :)\"\n          > </img></div><p></p><p></p>",
            "state": "PUBLISHED",
            "noOfInvitedReaders": 6,
            "noOfSeen": 0,
            "author": {
              "id": 84088,
              "name": "Jens Lekman",
              "avatar": "/userimages/jens_1512474200089.png",
              "sortBy": "Lekman"
            },
            "context": {
              "id": 38182,
              "name": "Orrarna",
              "avatar": null,
              "sortBy": "Orrarna"
            },
            "created": 1512647946564,
            "lastEdited": 1512647963243,
            "published": 1512647963348,
            "allowColleguesToEdit": false,
            "allowComments": true,
            "seen": true,
            "visibleTo": [
              "MENTOR_FOR",
              "STAFF_IN_SCHOOL",
              "STUDENT_IN_CLASS",
              "EXTERNAL_USER_IN_SCHOOL"
            ],
            "comments": [],
            "positions": [],
            "ingressImage": {
              "path": "http://localhost:8080/unikum-dev/content/blog/kommunen/forskolan/orrarna/190740_1512647947979_scaled.png",
              "id": 190742
            },
            "images": [],
            "attachments": [],
            "connectedTags": [],
            "connectedCurriculums": [],
            "connectedLpps": [],
            "connectedPoints": [],
            "allowedToEdit": true,
            "allowedToCopy": true,
            "allowedToDelete": true,
            "allowedCurriculumConnect": true,
            "allowedToConnect": true,
            "cursor": "190740"
          },
          {
            "id": 190265,
            "title": "qweqwe",
            "contentHTML": "<p>qweqweqwe</p><p></p><p></p><p></p>",
            "state": "SENT",
            "noOfInvitedReaders": 6,
            "noOfSeen": 0,
            "author": {
              "id": 84088,
              "name": "Jens Lekman",
              "avatar": "/userimages/jens_1512474200089.png",
              "sortBy": "Lekman"
            },
            "context": {
              "id": 38182,
              "name": "Orrarna",
              "avatar": null,
              "sortBy": "Orrarna"
            },
            "created": 1512632285017,
            "lastEdited": 1512632285053,
            "published": 1512641455398,
            "allowColleguesToEdit": false,
            "allowComments": true,
            "seen": true,
            "visibleTo": [
              "MENTOR_FOR",
              "STAFF_IN_SCHOOL",
              "STUDENT_IN_CLASS",
              "EXTERNAL_USER_IN_SCHOOL"
            ],
            "comments": [],
            "positions": [],
            "ingressImage": {
              "path": "http://localhost:8080/unikum-dev/content/blog/kommunen/forskolan/orrarna/190265_1512632286184_scaled.png",
              "id": 190267
            },
            "images": [],
            "attachments": [],
            "connectedTags": [],
            "connectedCurriculums": [],
            "connectedLpps": [],
            "connectedPoints": [],
            "allowedToEdit": true,
            "allowedToCopy": true,
            "allowedToDelete": true,
            "allowedCurriculumConnect": true,
            "allowedToConnect": true,
            "cursor": "190265"
          },
          {
            "id": 190385,
            "title": "Tjenare",
            "contentHTML": "<p>hejsan på dejsan</p><p></p><p></p><p></p><div data-custom-block-type=\"atomic\"><img\n             role=\"presentation\"\n              src=/unikum-dev//content/content/4bn3/190385-14cd2bad-6fa1-49e9-a162-e9f618be898e.png\n              width=undefined\n              height=undefined\n              caption=q\n              \n            > </img></div><p>qweqwe</p><h1>qwe</h1><p>Tjenare :)</p><p></p><div data-custom-block-type=\"atomic\"><span data-custom-entity-type=\"EXTERNAL_ATTACHMENT\" data-icon=\"https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document\" data-name=\"Ronneby upphandlingsdokument 2017\" data-embed-url=\"https://docs.google.com/a/unikum.net/document/d/1ceCq2FQHKUslMVtD1J9tPhzk8Ng-9C9UP1xHctslWtc/preview\" data-url=\"https://docs.google.com/a/unikum.net/document/d/1ceCq2FQHKUslMVtD1J9tPhzk8Ng-9C9UP1xHctslWtc/edit?usp=drive_web\"> </span></div><p></p><p>Tjabba Tjenare</p><p></p><p></p>",
            "state": "SENT",
            "noOfInvitedReaders": 6,
            "noOfSeen": 0,
            "author": {
              "id": 84088,
              "name": "Jens Lekman",
              "avatar": "/userimages/jens_1512474200089.png",
              "sortBy": "Lekman"
            },
            "context": {
              "id": 38182,
              "name": "Orrarna",
              "avatar": null,
              "sortBy": "Orrarna"
            },
            "created": 1512638279979,
            "lastEdited": 1512638346710,
            "published": 1512641171882,
            "allowColleguesToEdit": false,
            "allowComments": true,
            "seen": true,
            "visibleTo": [
              "MENTOR_FOR",
              "STAFF_IN_SCHOOL",
              "STUDENT_IN_CLASS",
              "EXTERNAL_USER_IN_SCHOOL"
            ],
            "comments": [],
            "positions": [],
            "ingressImage": {
              "path": "http://localhost:8080/unikum-dev/content/blog/kommunen/forskolan/orrarna/190385_1512638281309_scaled.png",
              "id": 190387
            },
            "images": [],
            "attachments": [],
            "connectedTags": [],
            "connectedCurriculums": [],
            "connectedLpps": [],
            "connectedPoints": [],
            "allowedToEdit": true,
            "allowedToCopy": true,
            "allowedToDelete": true,
            "allowedCurriculumConnect": true,
            "allowedToConnect": true,
            "cursor": "190385"
          },
          {
            "id": 190269,
            "title": "qweqwe",
            "contentHTML": "<p>qweqweqwe</p><p>qwe</p><p>q</p><p>we</p><p>qwe</p><p></p><p>qwe</p><p></p><p></p><p>213</p><p>qw</p><p>eq</p><p>we</p><p>qwe</p><p></p><p></p><p></p><p></p>",
            "state": "DRAFT",
            "noOfInvitedReaders": 6,
            "noOfSeen": 0,
            "author": {
              "id": 84088,
              "name": "Jens Lekman",
              "avatar": "/userimages/jens_1512474200089.png",
              "sortBy": "Lekman"
            },
            "context": {
              "id": 38182,
              "name": "Orrarna",
              "avatar": null,
              "sortBy": "Orrarna"
            },
            "created": 1512632386851,
            "lastEdited": 1512632386885,
            "published": null,
            "allowColleguesToEdit": false,
            "allowComments": true,
            "seen": true,
            "visibleTo": [
              "MENTOR_FOR",
              "STAFF_IN_SCHOOL",
              "STUDENT_IN_CLASS",
              "EXTERNAL_USER_IN_SCHOOL"
            ],
            "comments": [],
            "positions": [],
            "ingressImage": {
              "path": "http://localhost:8080/unikum-dev/content/blog/kommunen/forskolan/orrarna/190269_1512632388191_scaled.png",
              "id": 190271
            },
            "images": [],
            "attachments": [],
            "connectedTags": [],
            "connectedCurriculums": [],
            "connectedLpps": [],
            "connectedPoints": [],
            "allowedToEdit": true,
            "allowedToCopy": true,
            "allowedToDelete": true,
            "allowedCurriculumConnect": true,
            "allowedToConnect": true,
            "cursor": "190269"
          },
          {
            "id": 190258,
            "title": "Tjenare",
            "contentHTML": "<p>hsejanqwe</p><p>qw</p><p>e</p><p>qwe</p><p></p><p>qwe</p>",
            "state": "DRAFT",
            "noOfInvitedReaders": 6,
            "noOfSeen": 0,
            "author": {
              "id": 84088,
              "name": "Jens Lekman",
              "avatar": "/userimages/jens_1512474200089.png",
              "sortBy": "Lekman"
            },
            "context": {
              "id": 38182,
              "name": "Orrarna",
              "avatar": null,
              "sortBy": "Orrarna"
            },
            "created": 1512632236902,
            "lastEdited": 1512632236936,
            "published": null,
            "allowColleguesToEdit": false,
            "allowComments": true,
            "seen": true,
            "visibleTo": [
              "MENTOR_FOR",
              "STAFF_IN_SCHOOL",
              "STUDENT_IN_CLASS",
              "EXTERNAL_USER_IN_SCHOOL"
            ],
            "comments": [],
            "positions": [],
            "ingressImage": {
              "path": "http://localhost:8080/unikum-dev/content/blog/kommunen/forskolan/orrarna/190258_1512632238143_scaled.png",
              "id": 190260
            },
            "images": [],
            "attachments": [],
            "connectedTags": [],
            "connectedCurriculums": [],
            "connectedLpps": [],
            "connectedPoints": [],
            "allowedToEdit": true,
            "allowedToCopy": true,
            "allowedToDelete": true,
            "allowedCurriculumConnect": true,
            "allowedToConnect": true,
            "cursor": "190258"
          },
          {
            "id": 190204,
            "title": "TJenare",
            "contentHTML": "<p>hejsan</p><div data-custom-block-type=\"atomic\"><span data-custom-entity-type=\"EXTERNAL_ATTACHMENT\" data-icon=\"https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.presentation\" data-name=\"Förslag - Läringsverkstedet - Unikum - 6 dec 2017\" data-embed-url=\"https://docs.google.com/a/unikum.net/presentation/d/1ehVDkBrnCxZ6oNk6Aj-gr-V9RE4p_9amcQgLPV-xDnA/preview\" data-url=\"https://docs.google.com/a/unikum.net/presentation/d/1ehVDkBrnCxZ6oNk6Aj-gr-V9RE4p_9amcQgLPV-xDnA/edit?usp=drive_web\"> </span></div><p></p><p></p><p></p>",
            "state": "DRAFT",
            "noOfInvitedReaders": 6,
            "noOfSeen": 0,
            "author": {
              "id": 84088,
              "name": "Jens Lekman",
              "avatar": "/userimages/jens_1512474200089.png",
              "sortBy": "Lekman"
            },
            "context": {
              "id": 38182,
              "name": "Orrarna",
              "avatar": null,
              "sortBy": "Orrarna"
            },
            "created": 1512632050521,
            "lastEdited": 1512632050561,
            "published": null,
            "allowColleguesToEdit": false,
            "allowComments": true,
            "seen": true,
            "visibleTo": [
              "MENTOR_FOR",
              "STAFF_IN_SCHOOL",
              "STUDENT_IN_CLASS",
              "EXTERNAL_USER_IN_SCHOOL"
            ],
            "comments": [],
            "positions": [],
            "ingressImage": {
              "path": "http://localhost:8080/unikum-dev/content/blog/kommunen/forskolan/orrarna/190204_1512632050752_scaled.png",
              "id": 190206
            },
            "images": [],
            "attachments": [],
            "connectedTags": [],
            "connectedCurriculums": [],
            "connectedLpps": [],
            "connectedPoints": [],
            "allowedToEdit": true,
            "allowedToCopy": true,
            "allowedToDelete": true,
            "allowedCurriculumConnect": true,
            "allowedToConnect": true,
            "cursor": "190204"
          },
          {
            "id": 190199,
            "title": "qweqwe",
            "contentHTML": "<p>qweqwe</p><p></p><p></p><p></p>",
            "state": "DRAFT",
            "noOfInvitedReaders": 6,
            "noOfSeen": 0,
            "author": {
              "id": 84088,
              "name": "Jens Lekman",
              "avatar": "/userimages/jens_1512474200089.png",
              "sortBy": "Lekman"
            },
            "context": {
              "id": 38182,
              "name": "Orrarna",
              "avatar": null,
              "sortBy": "Orrarna"
            },
            "created": 1512631662286,
            "lastEdited": 1512631662326,
            "published": null,
            "allowColleguesToEdit": false,
            "allowComments": true,
            "seen": true,
            "visibleTo": [
              "MENTOR_FOR",
              "STAFF_IN_SCHOOL",
              "STUDENT_IN_CLASS",
              "EXTERNAL_USER_IN_SCHOOL"
            ],
            "comments": [],
            "positions": [],
            "ingressImage": {
              "path": "http://localhost:8080/unikum-dev/content/blog/kommunen/forskolan/orrarna/190199_1512631662519_scaled.png",
              "id": 190201
            },
            "images": [],
            "attachments": [],
            "connectedTags": [],
            "connectedCurriculums": [],
            "connectedLpps": [],
            "connectedPoints": [],
            "allowedToEdit": true,
            "allowedToCopy": true,
            "allowedToDelete": true,
            "allowedCurriculumConnect": true,
            "allowedToConnect": true,
            "cursor": "190199"
          },
          {
            "id": 189998,
            "title": "qweqwe",
            "contentHTML": "<p>qweqweq</p><div data-custom-block-type=\"atomic\"><img\n             role=\"presentation\"\n              src=/unikum-dev//content/content/4bn3/189998-8a645efc-9dfc-4a64-9a03-8579d371f12b.png\n              width=undefined\n              height=undefined\n              caption=undefined\n              \n            > </img></div><p>qweqwe</p><p></p><p></p><p>qwe</p><p></p><p></p>",
            "state": "PUBLISHED",
            "noOfInvitedReaders": 6,
            "noOfSeen": 0,
            "author": {
              "id": 84088,
              "name": "Jens Lekman",
              "avatar": "/userimages/jens_1512474200089.png",
              "sortBy": "Lekman"
            },
            "context": {
              "id": 38182,
              "name": "Orrarna",
              "avatar": null,
              "sortBy": "Orrarna"
            },
            "created": 1512575221447,
            "lastEdited": 1512575248850,
            "published": 1512575248904,
            "allowColleguesToEdit": false,
            "allowComments": true,
            "seen": true,
            "visibleTo": [
              "MENTOR_FOR",
              "STAFF_IN_SCHOOL",
              "STUDENT_IN_CLASS",
              "EXTERNAL_USER_IN_SCHOOL"
            ],
            "comments": [],
            "positions": [],
            "ingressImage": {
              "path": "http://localhost:8080/unikum-dev/content/blog/kommunen/forskolan/orrarna/189998_1512575222556_scaled.png",
              "id": 190000
            },
            "images": [],
            "attachments": [],
            "connectedTags": [],
            "connectedCurriculums": [],
            "connectedLpps": [],
            "connectedPoints": [],
            "allowedToEdit": true,
            "allowedToCopy": true,
            "allowedToDelete": true,
            "allowedCurriculumConnect": true,
            "allowedToConnect": true,
            "cursor": "189998"
          }
        ],
        "cursor": "189998",
        "hasNext": true
      })).toMatchSnapshot();
    });
  });
});
