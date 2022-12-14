export const vuerdJson = {
    canvas: {
      version: "2.0.0",
      width: 3900,
      height: 3900,
      scrollTop: 0,
      scrollLeft: 0,
      zoomLevel: 1,
      show: {
        tableComment: true,
        columnComment: true,
        columnDataType: true,
        columnDefault: true,
        columnAutoIncrement: false,
        columnPrimaryKey: true,
        columnUnique: false,
        columnNotNull: true,
        relationship: true
      },
      database: "MySQL",
      databaseName: "",
      canvasType: "ERD",
      language: "GraphQL",
      tableCase: "pascalCase",
      columnCase: "camelCase",
      setting: {
        relationshipDataTypeSync: true,
        columnOrder: [
          "columnName",
          "columnDataType",
          "columnNotNull",
          "columnUnique",
          "columnAutoIncrement",
          "columnDefault",
          "columnComment"
        ]
      }
    },
    table: {
      tables: [
        {
          name: "user_role",
          comment: "",
          columns: [
            {
              id: "4c6b94a0-0188-943b-c119-43c9aca850ed",
              name: "user_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: true,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "d868c8a9-8145-114a-5a9d-fdf53d545dbb",
              name: "role_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: true,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            }
            // {
            //   id: "d868c8a9-8145-114a-5a9d-fdf53d545db1",
            //   name: "role_id",
            //   comment: "",
            //   dataType: "INT",
            //   default: "",
            //   option: {
            //     autoIncrement: false,
            //     primaryKey: true,
            //     unique: false,
            //     notNull: true
            //   },
            //   ui: {
            //     active: false,
            //     pk: false,
            //     fk: false,
            //     pfk: true,
            //     widthName: 60,
            //     widthComment: 60,
            //     widthDataType: 60,
            //     widthDefault: 60
            //   }
            // },
            // {
            //   id: "d868c8a9-8145-114a-5a9d-fdf53d545db3",
            //   name: "role_id",
            //   comment: "",
            //   dataType: "INT",
            //   default: "",
            //   option: {
            //     autoIncrement: false,
            //     primaryKey: true,
            //     unique: false,
            //     notNull: true
            //   },
            //   ui: {
            //     active: false,
            //     pk: false,
            //     fk: false,
            //     pfk: true,
            //     widthName: 60,
            //     widthComment: 60,
            //     widthDataType: 60,
            //     widthDefault: 60
            //   }
            // },
            // {
            //   id: "d868c8a9-8145-114a-5a9d-fdf53d545db5",
            //   name: "role_id",
            //   comment: "",
            //   dataType: "INT",
            //   default: "",
            //   option: {
            //     autoIncrement: false,
            //     primaryKey: true,
            //     unique: false,
            //     notNull: true
            //   },
            //   ui: {
            //     active: false,
            //     pk: false,
            //     fk: false,
            //     pfk: true,
            //     widthName: 60,
            //     widthComment: 60,
            //     widthDataType: 60,
            //     widthDefault: 60
            //   }
            // },
            // {
            //   id: "d868c8a9-8145-114a-5a9d-fdf53d545db7",
            //   name: "role_id",
            //   comment: "",
            //   dataType: "INT",
            //   default: "",
            //   option: {
            //     autoIncrement: false,
            //     primaryKey: true,
            //     unique: false,
            //     notNull: true
            //   },
            //   ui: {
            //     active: false,
            //     pk: false,
            //     fk: false,
            //     pfk: true,
            //     widthName: 60,
            //     widthComment: 60,
            //     widthDataType: 60,
            //     widthDefault: 60
            //   }
            // }
          ],
          ui: {
            active: false,
            left: 50,
            top: 50,
            zIndex: 1,
            widthName: 60,
            widthComment: 60
          },
          id: "a41506e3-20b1-b67d-ee82-e3fd5609adb0"
        },
        {
          name: "avatar_tag",
          comment: "",
          columns: [
            {
              id: "e9d2a44d-c0ef-7c12-da87-b21b71cb2805",
              name: "avatar_tags_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 85,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "5211dc4e-7688-a8c7-fced-bfd651753c82",
              name: "tag_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 456,
            top: 50,
            zIndex: 2,
            widthName: 62,
            widthComment: 60
          },
          id: "8795e11d-a105-7907-b9dd-c7763f3f6271"
        },
        {
          name: "job_position_tag",
          comment: "",
          columns: [
            {
              id: "6fc7ab8f-1bef-31ba-1153-ec2a6ee0da9d",
              name: "job_position_tags_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 121,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "1d675e2d-e431-b135-31fa-2d1a7416c8c4",
              name: "tag_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 887,
            top: 50,
            zIndex: 3,
            widthName: 98,
            widthComment: 60
          },
          id: "1ec9a90f-cd0d-c5a6-0ab6-3b9f0e95971c"
        },
        {
          name: "content_file",
          comment: "",
          columns: [
            {
              id: "46b407d5-0d76-0562-270d-a0c384463188",
              name: "content_files_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 92,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "b007a58b-d3da-8b4c-4204-6539ad5a0ce6",
              name: "file_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 1354,
            top: 50,
            zIndex: 4,
            widthName: 70,
            widthComment: 60
          },
          id: "0ee988e5-da04-fe94-b7b8-b9f4869527b1"
        },
        {
          name: "article_tag",
          comment: "",
          columns: [
            {
              id: "e2f49064-0215-4ac1-8acd-4e5ab32ebe0f",
              name: "article_tags_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 84,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "94976424-e65a-b763-997d-7e590af348f7",
              name: "tag_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 1792,
            top: 50,
            zIndex: 5,
            widthName: 62,
            widthComment: 60
          },
          id: "31b3c2be-e465-e50f-338d-dd66b1f9be46"
        },
        {
          name: "resume",
          comment: "",
          columns: [
            {
              id: "8a5eb629-fded-5803-146c-97f6c87c6839",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "d757f0dd-3c63-bdc7-2794-64478b8999aa",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 2222,
            top: 50,
            zIndex: 6,
            widthName: 60,
            widthComment: 60
          },
          id: "04ec5085-835a-3817-1ee0-16ff9bcd2dd3"
        },
        {
          name: "area_city_code",
          comment: "",
          columns: [
            {
              id: "2bff8d2a-a191-3fe9-4f8b-5efe8226722f",
              name: "id",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "dd2cb856-d4b9-697a-f05e-4565f6c0216f",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "64e9ec80-a504-bebe-5286-611e52fc5bbf",
              name: "name",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 2628,
            top: 50,
            zIndex: 7,
            widthName: 87,
            widthComment: 60
          },
          id: "0059ccf8-a317-cae8-7888-c23de771ad75"
        },
        {
          name: "spam_word",
          comment: "",
          columns: [
            {
              id: "c7f7508b-65ca-f814-9d38-f249fc4ff0fe",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "27f666d8-8943-fac3-459c-c8de33931b34",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "81c1f4eb-eb5e-bf64-d564-c995ddd11b07",
              name: "text",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 3064,
            top: 50,
            zIndex: 8,
            widthName: 69,
            widthComment: 60
          },
          id: "fd9d43e2-2382-7eee-a4ef-52f8f22a4ab3"
        },
        {
          name: "role",
          comment: "",
          columns: [
            {
              id: "079a8657-c7eb-1baf-7b3d-9814df783577",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "4d5d5388-2676-fb32-9885-5b9a3422d5a6",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "b472ceac-4e76-672c-3df2-9564c9fe9758",
              name: "authority",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 50,
            top: 238.5,
            zIndex: 9,
            widthName: 60,
            widthComment: 60
          },
          id: "d8e93818-2ad2-d9e6-72f2-6805e267f4e1"
        },
        {
          name: "managed_user",
          comment: "",
          columns: [
            {
              id: "a6d3352b-be37-c783-d7b0-e8b813569b57",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "e23db2b2-3642-b4c2-e08a-a814cc031ec5",
              name: "user_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "8d6a267e-4462-8d9e-1687-821bdc270a55",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 486,
            top: 238.5,
            zIndex: 10,
            widthName: 87,
            widthComment: 60
          },
          id: "41e193b6-0a0f-4824-5d6d-510b74996376"
        },
        {
          name: "follow",
          comment: "",
          columns: [
            {
              id: "db10b983-6448-e310-10bc-2661e7d2af05",
              name: "follower_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: true,
                widthName: 66,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "a26b8353-4a13-15bb-d945-d2242ae99c1d",
              name: "following_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: true,
                widthName: 73,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "94d592c3-be00-d7fd-d1ec-17df81d776ad",
              name: "date_created",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 892,
            top: 238.5,
            zIndex: 11,
            widthName: 60,
            widthComment: 60
          },
          id: "5150ec67-88aa-dd8f-bd70-f53e1b71ecf2"
        },
        {
          name: "area_district_code",
          comment: "",
          columns: [
            {
              id: "02e23016-f1e5-9d0c-f0bd-0375d2fa2abd",
              name: "id",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "488db199-c69d-23ba-cf4e-97e76577d922",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "9885e4ca-7b68-29c2-fa63-2b732ed8c4b6",
              name: "area_city_code_id",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 104,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "f35184e5-7129-a1de-f210-83c5135cd420",
              name: "name",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 1318,
            top: 238.5,
            zIndex: 12,
            widthName: 106,
            widthComment: 60
          },
          id: "4c744c49-4579-c548-5e0f-454c578037bc"
        },
        {
          name: "notification_read",
          comment: "",
          columns: [
            {
              id: "d33fac2f-80f8-93aa-cfad-7ef4b1c9e939",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "c07fa9f2-4c82-8e75-343b-3d95196412fd",
              name: "avatar_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "6fafdad6-4415-f12e-5718-356f6211f687",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "450c7e49-e1ed-5f58-dc84-e35e714af3f8",
              name: "last_read",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 1798,
            top: 238.5,
            zIndex: 13,
            widthName: 100,
            widthComment: 60
          },
          id: "8ab32e75-e219-b7e0-d125-d987c3bf0277"
        },
        {
          name: "scrap",
          comment: "",
          columns: [
            {
              id: "1db4d234-78d4-3e14-cbad-5dbbe071e057",
              name: "avatar_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: true,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "fb300d91-06ab-51ca-0fc8-2319c3fcac84",
              name: "article_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: true,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "9c3d345e-c712-a1d3-2273-276c62e8c50b",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "fe88b245-91c9-c69b-2b10-a99a99c79529",
              name: "date_created",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 2207,
            top: 238.5,
            zIndex: 14,
            widthName: 60,
            widthComment: 60
          },
          id: "07bfad1f-eda0-51a9-ff86-fc3a4a79df0e"
        },
        {
          name: "career",
          comment: "",
          columns: [
            {
              id: "b8e80bd0-d7e1-b2f5-1548-c753478ecb2b",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "069ca746-6e00-f142-f5c0-d8dfb4f01bef",
              name: "company_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 72,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "9837c35c-b920-019b-7dc0-3d41d1c0a1be",
              name: "resume_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 62,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "62665761-78eb-9831-b9c7-223911e4bf07",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 2633,
            top: 238.5,
            zIndex: 15,
            widthName: 60,
            widthComment: 60
          },
          id: "428bc63c-c89a-9264-885f-a274531ac29d"
        },
        {
          name: "tag_similar_text",
          comment: "",
          columns: [
            {
              id: "89d541c7-0c53-6ef0-dcdf-ecc30b4690f4",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "78362362-7fe9-e100-8525-42790ac6134c",
              name: "tag_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "93673a37-1300-ae35-ed18-85f8a541f246",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "0a0b43f5-2687-5c74-7b50-9867530621d4",
              name: "text",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 3051,
            top: 238.5,
            zIndex: 16,
            widthName: 92,
            widthComment: 60
          },
          id: "829636de-aa66-1c8c-74a2-d76374faa190"
        },
        {
          name: "oauthid",
          comment: "",
          columns: [
            {
              id: "24b91538-25e0-7c0f-3a95-2bc1db4b8653",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "4f3636c8-dbb5-a73c-a4fa-d615e4629cac",
              name: "user_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "b678c2a5-c321-5b40-ca47-8472293e26bc",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "2c0ee72e-7871-cd94-363f-6ddab6afdbbf",
              name: "access_token",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 78,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "35c280d2-8aa7-0495-203a-dda2e84d92dc",
              name: "provider",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 50,
            top: 447.5,
            zIndex: 17,
            widthName: 60,
            widthComment: 60
          },
          id: "91db363d-9613-3d98-5d32-7b95626945d8"
        },
        {
          name: "tag",
          comment: "",
          columns: [
            {
              id: "d5916a15-610f-6d1d-37aa-e87947960609",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "f036ce0a-1163-b0b0-26d1-c13c3ee83602",
              name: "date_created",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "4cfe040a-f2fb-c0fc-33fb-344402cfc453",
              name: "description",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 67,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "4f79675c-ad7b-eb55-f732-d8c3cd1ddbeb",
              name: "name",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "9229bc75-881f-ce7e-0b1a-bf537379128e",
              name: "tagged_count",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 83,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 504,
            top: 447.5,
            zIndex: 18,
            widthName: 60,
            widthComment: 60
          },
          id: "41369993-006b-037d-7a21-e0791df6220c"
        },
        {
          name: "logged_in",
          comment: "",
          columns: [
            {
              id: "f4f8918b-c2b4-e905-3c6e-8b0b46a46376",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "705b758c-f394-7552-e79e-bc0668e8ae55",
              name: "user_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "785b04f5-ba51-e168-1161-cfaecf87ee08",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "7107f3d3-a1b9-a837-5305-d8cf1c966ee4",
              name: "date_created",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "2adfeeb6-476b-eeeb-e677-30199332130f",
              name: "remote_addr",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 963,
            top: 447.5,
            zIndex: 19,
            widthName: 60,
            widthComment: 60
          },
          id: "0e40a2e3-6762-2656-45e2-d4b9a24bb89c"
        },
        {
          name: "confirm_email",
          comment: "",
          columns: [
            {
              id: "dc815a03-b65e-00c5-e158-cb3946534b3a",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "4b7f8e50-67b0-8ece-f26c-c09aae88af3c",
              name: "user_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "f138aa29-fdbb-6fb6-63cc-5248fb57c89f",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "c38948a1-9108-ada0-7321-8d7edcef46b3",
              name: "date_expired",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "ad59265b-a75e-7c03-1962-67e793ba0289",
              name: "email",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "d1e3c232-1659-7e72-c758-f3b22adfb84e",
              name: "secured_key",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 73,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 1416,
            top: 447.5,
            zIndex: 20,
            widthName: 84,
            widthComment: 60
          },
          id: "d0162089-5957-561e-3d3d-fcb9b4d7795a"
        },
        {
          name: "banner_click",
          comment: "",
          columns: [
            {
              id: "fde4ef07-27da-901b-756b-5c12a7bcad4c",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "6397cd8e-1940-6cb3-b273-3e10f1485ac2",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "a6627b14-b493-2bcf-8911-2e15e17c92d1",
              name: "banner_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "4d0494ea-25d1-d899-fd96-1a84de8f975b",
              name: "click_count",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 66,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "b1bf757a-55ae-7ba3-6079-dc6238907e6d",
              name: "date_created",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "aab775f2-ad1b-9e25-d47a-56e17f503fd6",
              name: "ip",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 1869,
            top: 447.5,
            zIndex: 21,
            widthName: 74,
            widthComment: 60
          },
          id: "fdcb64a6-dd2c-6b80-7ea8-ab84e352df18"
        },
        {
          name: "anonymous",
          comment: "",
          columns: [
            {
              id: "fc9edc17-0f68-5c20-af69-794386949918",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "d06f3e9c-b452-3eda-28e0-333690e528dd",
              name: "article_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "76dcfa97-e4b9-b194-e424-dffcfdd9f724",
              name: "user_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "b4621763-f6d2-4610-0642-c5ee8bae3d0b",
              name: "content_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 63,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "597b7ce1-6bfd-815a-38fd-8548ebb48607",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "5ff0b944-99bf-69f7-5aa4-910d62609b98",
              name: "type",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 2322,
            top: 447.5,
            zIndex: 22,
            widthName: 70,
            widthComment: 60
          },
          id: "1961865a-6149-3d6a-cdfb-05698344ee19"
        },
        {
          name: "content_vote",
          comment: "",
          columns: [
            {
              id: "ab7afd97-74ae-8da5-2c61-ff3a8e15e4c3",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "83caadd5-8093-372a-1724-42a8888569d1",
              name: "article_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "7ef6bd70-c88f-47de-3de5-b0aec435d43e",
              name: "voter_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "f369a11d-f250-77b3-eaf7-efdee8c32169",
              name: "content_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 63,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "4916227f-04ac-f1d2-1ef3-def861a29e6a",
              name: "date_created",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "ab4cd1a8-af67-5534-47e6-ccb6aeb2a729",
              name: "point",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 2761,
            top: 447.5,
            zIndex: 23,
            widthName: 78,
            widthComment: 60
          },
          id: "a0726e8e-d765-3127-7e56-46c0ad6ce980"
        },
        {
          name: "avatar",
          comment: "",
          columns: [
            {
              id: "0a6ab052-eac7-6704-ff49-baa8637ab822",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "4952f5fa-85ac-1922-f9cb-1172e2a3ed79",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "aeb22a2a-f7d0-b4c3-0f3b-ceb1aa74b77f",
              name: "activity_point",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 79,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "fddc3e29-2444-0b38-92dc-0210b749d37c",
              name: "nickname",
              comment: "",
              dataType: "VARCHAR(20)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 83,
                widthDefault: 60
              }
            },
            {
              id: "f4d2d248-87e6-31f6-2983-73c9df4d9863",
              name: "official",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "3646dea7-36ee-a6f2-c84f-074086f07c8d",
              name: "picture",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "1f41acb7-d8a2-7f9c-5050-e7fa2d3f4646",
              name: "picture_type",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 74,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 3187,
            top: 447.5,
            zIndex: 24,
            widthName: 60,
            widthComment: 60
          },
          id: "bde0d395-1f6e-8fad-535c-e4b845f5c73f"
        },
        {
          name: "opinion",
          comment: "",
          columns: [
            {
              id: "68d31e1f-5309-fccc-a216-f76ec12f9dc5",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "65ebffa9-2f9b-8407-470a-fafafdc82ac4",
              name: "content_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 63,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "490da600-199a-90fd-17fd-d978f0fbefc7",
              name: "author_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "6362dc0c-9425-012e-5c1e-4d5e1f1c3e37",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "44dd6fc1-1ded-2b66-0083-d0aafcfc312e",
              name: "comment",
              comment: "",
              dataType: "TEXT(4294967295)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 110,
                widthDefault: 60
              }
            },
            {
              id: "2e240b3a-a07d-7e02-79bb-33408d703735",
              name: "date_created",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "114e88c0-76d7-b973-6ddc-8e763d40a5d1",
              name: "last_updated",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "ffe291aa-116d-45f6-7f85-335e981a019e",
              name: "vote_count",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 67,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 50,
            top: 718,
            zIndex: 25,
            widthName: 60,
            widthComment: 60
          },
          id: "2de64cc2-6a86-c657-3c94-fe68ad42d27f"
        },
        {
          name: "company",
          comment: "",
          columns: [
            {
              id: "3b3074ab-3a09-833a-7326-28fae47a3f1b",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "c0846efc-f3eb-90d2-7307-fb4b552f3ad9",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "3f5dbbda-48d0-7040-ae63-04e0fa5c5dd6",
              name: "enabled",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "9a3f75d2-0adb-cd8d-9a73-ed73050385c2",
              name: "locked",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "57654e6f-8d71-f44d-7a38-6daff7928425",
              name: "logo",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "2855f966-5950-ccf6-06f7-1abddf1ba2d6",
              name: "manager_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 70,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "ad881bd8-fa9f-19f4-4f37-dd980a3d4d86",
              name: "name",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "6051a67e-f638-1150-125b-a6c324bc7e62",
              name: "register_number",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 98,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 523,
            top: 718,
            zIndex: 26,
            widthName: 60,
            widthComment: 60
          },
          id: "0dad4397-b6d2-3722-0c4d-17862403afce"
        },
        {
          name: "job_position",
          comment: "",
          columns: [
            {
              id: "d1aeecb8-9719-8947-7c7f-7fa68707cf7a",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "482894fa-5432-e281-9d1c-d94dd90c3438",
              name: "recruit_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "1aa22e0c-0199-c98b-aceb-68c2c4c5f885",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "5fb14d73-32c2-0dca-58dc-0bcaeba74533",
              name: "description",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 67,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "594965fc-c2eb-f888-8cc6-97d106226850",
              name: "job_pay_type",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 79,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "09c6a569-2e7b-0cec-d027-af017aca0e37",
              name: "max_career",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 68,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "4c8efd7a-6394-ea38-3d10-f8479d95f86d",
              name: "min_career",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 66,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "a8b6befa-1aa4-ed6d-680a-5ae52d9148c6",
              name: "tag_string",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "933ee062-baf0-c87d-f170-26f2a830483a",
              name: "title",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 997,
            top: 718,
            zIndex: 27,
            widthName: 74,
            widthComment: 60
          },
          id: "cc0d4c9e-a054-65a4-e198-ffd55d52c0f0"
        },
        {
          name: "company_info",
          comment: "",
          columns: [
            {
              id: "e7ad4af8-aa95-17ae-88cf-70e817d260f1",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "55c3b4e3-296d-706b-56f6-a7b2210e432b",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "7d3ec237-b951-0735-bde0-a22dbfc255eb",
              name: "company_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 72,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "916ce041-d1c7-51a3-993a-d3f9b803f28a",
              name: "description",
              comment: "",
              dataType: "TEXT(4294967295)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 67,
                widthComment: 60,
                widthDataType: 110,
                widthDefault: 60
              }
            },
            {
              id: "0435ab13-40cc-3cb4-5967-bb55bdbfce3c",
              name: "email",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "25938bf3-7026-aa1e-03e2-47b7fe824dc0",
              name: "employee_number",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 111,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "c4e58dd7-43df-5b74-8f77-25293e8af0f4",
              name: "homepage_url",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 86,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "6c33129c-018d-ef57-8596-a1c768f46337",
              name: "tel",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "44758d4a-f452-bb13-94ec-31a7fd366b05",
              name: "welfare",
              comment: "",
              dataType: "TEXT(4294967295)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 110,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 1452,
            top: 718,
            zIndex: 28,
            widthName: 84,
            widthComment: 60
          },
          id: "efd24bb0-4d34-3665-6cce-0bdbf6d98c56"
        },
        {
          name: "file",
          comment: "",
          columns: [
            {
              id: "a3e3ea4d-1e1e-072a-72f7-1080b2af1169",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "d7c3d577-9195-1332-a88a-59657b227d01",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "f0275bea-bbf8-16bf-8c6f-d412f8d102de",
              name: "attach_type",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 69,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "f1a76f9d-2100-6298-896c-f26a5e557639",
              name: "byte_size",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "323ec97c-4a35-bad7-ca32-6bdb0ccf0368",
              name: "height",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "ff1414d7-eccf-9eb2-8ae1-390949251c80",
              name: "name",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "aea602d0-d2a6-365a-3231-16584e0fc870",
              name: "org_name",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "60eacc23-79a7-e40c-f539-1742f2f4053b",
              name: "type",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "15b48036-eff7-7480-5839-3db3161a5ba7",
              name: "width",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 1959,
            top: 718,
            zIndex: 29,
            widthName: 60,
            widthComment: 60
          },
          id: "3807a00b-23dc-6b36-12fc-cc105a7e9aa6"
        },
        {
          name: "notification",
          comment: "",
          columns: [
            {
              id: "1b4e49f2-1976-aed9-d681-fc3d6c9e1602",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "a9672a7d-420a-593a-0c49-8e2ba9cfcf0c",
              name: "article_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "97d749b9-2e4c-b1b1-600b-5e123b253e03",
              name: "sender_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "cad0ef67-0f31-3d23-93f1-1eb0c13b63fe",
              name: "receiver_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 64,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "01d20515-fcdb-a15d-c3b4-72e3086e14e0",
              name: "content_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 63,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "64ce7bf2-b215-44b4-19e0-3153dc701e53",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "9176ab78-6aa1-7c03-54cd-bdbff485a6ea",
              name: "date_created",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "446563b0-4782-b931-f7f5-8d9b3ee44e9a",
              name: "last_updated",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "45bad42f-33c5-de03-20c8-46bc99ffa329",
              name: "type",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 2404,
            top: 718,
            zIndex: 30,
            widthName: 68,
            widthComment: 60
          },
          id: "aaa604b7-18a7-ac85-ec56-c4b6a4ee3a56"
        },
        {
          name: "banner",
          comment: "",
          columns: [
            {
              id: "da1e4d3d-e0b8-6bb0-dccc-0a1b9dc127f0",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "249e46ef-3d90-51e6-ef0b-3bbaa0625655",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "8329a5e8-df5d-0528-2b0a-571c8ec84b71",
              name: "date_created",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "232ce167-c238-b3cd-da0b-2b14f15e405d",
              name: "image",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "ab3e39e6-07af-fdbb-56e1-46000b08153e",
              name: "last_updated",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "8161be10-df44-c6f4-38b6-7161725f3c29",
              name: "name",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "304b39a6-d58f-76c5-911e-11d1a29d1c75",
              name: "target",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "621728e4-0a65-e68d-cde7-7b989aeff9ae",
              name: "type",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "f7db4a41-3d58-fafe-e40e-dc1348f46c80",
              name: "url",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "d906092a-1596-588a-57b2-62c2b731fade",
              name: "visible",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 2857,
            top: 718,
            zIndex: 31,
            widthName: 60,
            widthComment: 60
          },
          id: "fda6b3f6-13b2-698c-5f5f-2bd26e10aa2b"
        },
        {
          name: "person",
          comment: "",
          columns: [
            {
              id: "ad773969-1568-5e18-1bdc-5146f4c7dde9",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "ae06befe-f571-efcb-0f7c-c8e933ff61ec",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "2e0acc7c-20c2-4abc-66a5-215b4fda05eb",
              name: "company_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 72,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "988570c1-f126-de31-e898-f09445e572bb",
              name: "date_created",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "b64f554d-b5f5-dd21-d6ff-b7c912a59d48",
              name: "dm_allowed",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 72,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "38d66f14-ea31-5236-d605-5c66ebd4ecaf",
              name: "email",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "9eec1c8c-dd5f-6ae9-e201-567b61cf4058",
              name: "full_name",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "30ef45b4-8153-33d5-8438-292fbcf62474",
              name: "homepage_url",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 86,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "dd7eb31b-999d-b733-094e-197e48ee06af",
              name: "last_updated",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "9ed8c1e9-6658-a477-18ab-0e322e443018",
              name: "resume_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 62,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 3310,
            top: 718,
            zIndex: 32,
            widthName: 60,
            widthComment: 60
          },
          id: "4daf5301-cca9-6d6e-9bba-12bfcb42c467"
        },
        {
          name: "activity",
          comment: "",
          columns: [
            {
              id: "a40a1b66-87da-9d82-7d57-ac2723c4eeb6",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "031e3cff-12bc-312a-af69-7c25780dfa00",
              name: "avatar_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "85de484b-b309-625a-8aa1-63fd5117ae38",
              name: "article_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "fe76f772-0839-be5b-29b2-06071f7a6fca",
              name: "content_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 63,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "a3f876a2-e2d5-3d9c-439a-5112cb67c2b1",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "74603eed-f107-6ea5-aedf-ddbd1f2dac77",
              name: "date_created",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "c89b125a-8610-dc2d-0c1e-700e3f63aba2",
              name: "last_updated",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "64a66587-626b-7dd9-232d-17793a81428c",
              name: "point",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "29417a6b-3a91-c667-79bc-b1eb77f0a04c",
              name: "point_type",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 64,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "400e27b1-c8d8-d461-35f6-e3c84f3e0f57",
              name: "type",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 50,
            top: 1050,
            zIndex: 33,
            widthName: 60,
            widthComment: 60
          },
          id: "ef22b63f-3126-0b73-3043-35d898fc2649"
        },
        {
          name: "change_log",
          comment: "",
          columns: [
            {
              id: "3e91418a-f875-0ce7-6657-177d333008dc",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "e1252142-ec79-bb31-dbc9-2391c12df753",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "1b812281-1c12-5e17-a362-b8b4a362c805",
              name: "article_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "e53d31f2-7432-7747-ca46-3b7c018bb529",
              name: "avatar_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "88100d82-217e-761c-7b75-cc39b30f1137",
              name: "content_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 63,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "0558c560-076d-1322-b9e9-1d8a94b2e32c",
              name: "date_created",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "dcd53183-f075-e1e4-98d1-8565209dd394",
              name: "md5",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "230ecb3d-a475-8d95-3fb2-23729cb7ba19",
              name: "patch",
              comment: "",
              dataType: "TEXT(4294967295)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 110,
                widthDefault: 60
              }
            },
            {
              id: "c7e669b9-f917-0b34-6ff3-c2cc8099a784",
              name: "revision",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "76eb19a9-f2fb-f354-087e-2e9e0a763d13",
              name: "type",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 503,
            top: 1050,
            zIndex: 34,
            widthName: 69,
            widthComment: 60
          },
          id: "b71cdc51-425b-fd21-5c2e-103c47b30b8f"
        },
        {
          name: "recruit",
          comment: "",
          columns: [
            {
              id: "f79cdcf6-d862-91e7-ca36-07d24fa18e98",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "0f7197d3-02da-8fa5-958b-17b2d3ae8777",
              name: "article_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "042e0a1a-8321-ccf3-7527-1594a48a9fb6",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "5c224c66-35cb-e29f-626c-7727e9c0e6a5",
              name: "city",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "4bd17f37-f970-bd20-e1a3-2223b843f59a",
              name: "closed",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "c0de0b58-44f6-9e9e-ea2b-9b31169b278c",
              name: "company_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 72,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "64e24713-f14b-1521-443f-bac556ff3735",
              name: "district",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "f03f336c-b6cd-ee8c-9f22-fc2455c337b3",
              name: "email",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "25e7c79e-5307-7a42-f5fb-e3dd498afe5d",
              name: "job_type",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "d10390d1-767b-98e8-252f-2cf859497963",
              name: "start_date",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "4bd5d869-388e-afc4-0f11-8989ffa811ce",
              name: "tel",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "ccd360ac-ef58-e678-977a-d3540cd9a884",
              name: "working_month",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 93,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 976,
            top: 1050,
            zIndex: 35,
            widthName: 60,
            widthComment: 60
          },
          id: "d0d04c18-7f81-cd9f-8af4-493c9b4b2318"
        },
        {
          name: "content",
          comment: "",
          columns: [
            {
              id: "cde0049b-4c87-6122-1a1f-1d21f6c68a04",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "027ed306-89bc-287c-4866-06a8aaa559d1",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "1bb653e6-1e78-140c-550f-5dacd45a9592",
              name: "a_nick_name",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 76,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "a6010cc8-77cb-e4cb-6050-f332e1b81a1a",
              name: "anonymity",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 64,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "6d91bd1b-586c-1e8f-583a-a6a988b7b4e0",
              name: "article_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "cf316f27-1343-ec69-9c96-2a03462190a1",
              name: "author_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "a16c6d08-4300-3021-7865-a08c42c997ae",
              name: "create_ip",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "49ddb208-d5b1-e7db-90c8-c699d92760d6",
              name: "date_created",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "26905326-99a5-76d2-37bc-93f6a235fdb1",
              name: "last_editor_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 79,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "ad57a05d-d240-814e-f193-a6c82073f035",
              name: "last_updated",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "26e3c0c9-05fc-324d-6736-15f8d6e18b55",
              name: "selected",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "7939d9fe-3e00-779c-0b53-a8175c0aea0b",
              name: "text",
              comment: "",
              dataType: "TEXT(4294967295)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 110,
                widthDefault: 60
              }
            },
            {
              id: "0f477b3a-5489-3797-08a3-51cc4243e999",
              name: "text_type",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "31b56ddb-fcd8-edf8-6e6e-53c4faacb63f",
              name: "type",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "3ff26049-5176-dca8-38f0-20bcaac431e1",
              name: "vote_count",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 67,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 1445,
            top: 1050,
            zIndex: 36,
            widthName: 60,
            widthComment: 60
          },
          id: "b40bda49-78b5-95f5-9fe6-2d6d6e7f46b4"
        },
        {
          name: "user",
          comment: "",
          columns: [
            {
              id: "f5d69dd1-04f1-c23d-5340-cfe906f08239",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "6a78d179-db14-f28d-c0ef-36d43de923c4",
              name: "avatar_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "3261366f-f748-4e5b-cfb0-03df6f302449",
              name: "person_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "e084bcf8-9068-d893-bb64-6336336cf1e8",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "dfc09c9e-5851-e088-85a3-4d62175e40e7",
              name: "account_expired",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 97,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "2eac742b-4d07-73e0-b16e-da6026854c7b",
              name: "account_locked",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 92,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "8741bae8-9e27-8aa7-4c0b-d15c97266969",
              name: "create_ip",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "73f55053-ef77-c33c-c390-0c0ec5de8d44",
              name: "date_created",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "ef34c067-e032-777d-d6b5-afe65513dcc3",
              name: "date_withdraw",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 87,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "6fce7cd5-8a36-b7de-d1be-8718ffc6c3ec",
              name: "enabled",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "8dda1b97-aefd-0f04-0dd1-7ce254e1d6dd",
              name: "last_password_changed",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 139,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "95718004-fcdd-7c6a-66ce-8ea12183d869",
              name: "last_update_ip",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 86,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "b6335d37-e022-e7bd-2e58-8f18b236bc8d",
              name: "last_updated",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "65e42c5c-f483-b1e4-8fba-338769ecaeac",
              name: "password",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "c20b5950-3b2c-5fc1-41a6-08288f3673ca",
              name: "password_expired",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 107,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "2a80e6d1-b28a-39b4-86f7-af280b2e4702",
              name: "username",
              comment: "",
              dataType: "VARCHAR(15)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 83,
                widthDefault: 60
              }
            },
            {
              id: "2a16c04d-7937-500b-d150-96ce1ac224a5",
              name: "withdraw",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 1920,
            top: 1050,
            zIndex: 37,
            widthName: 60,
            widthComment: 60
          },
          id: "f83416a1-3f0e-c292-a40d-51bb3ae72dcc"
        },
        {
          name: "article",
          comment: "",
          columns: [
            {
              id: "0ba9cf47-57e1-84ac-7526-56e5f47222ef",
              name: "id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "eeffd857-df71-e614-ca11-3a3c0ae0df2e",
              name: "category_id",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 70,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "e614f702-0223-36b9-e501-1d146943e99d",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "82aab247-e68f-a6a4-bfb4-6961ae7f5618",
              name: "a_nick_name",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 76,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "f397c0cb-8828-ccb3-46c8-25dd23986ada",
              name: "anonymity",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 64,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "9befb714-b40a-ce51-9599-bc9e636d5752",
              name: "author_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "b45eec69-af8f-11b6-55e6-3b6a507d6cc4",
              name: "choice",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "088c0d13-323b-95cb-0fa6-9643c4815515",
              name: "content_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 63,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "2e9e1443-6301-e9e1-67e4-91e55d45ef61",
              name: "create_ip",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "49391c48-7c00-3fa7-1a49-19962f66ea42",
              name: "date_created",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "82aad6c8-eb21-d799-fa16-5a01b735a0fb",
              name: "enabled",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "eac9a012-b930-9fe3-2c19-5ec95d5f6439",
              name: "is_recruit",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "f70ab7e6-da08-1aa6-2091-b3c6e87e8939",
              name: "last_editor_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 79,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "cc6d1b45-32fe-0b60-ea15-3a999140c255",
              name: "last_updated",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "84ed5599-62c6-2329-4bfe-01f8d8ab2a1c",
              name: "note_count",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 68,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "a8afcc28-9ca4-3e47-6c12-6b9e4849644f",
              name: "scrap_count",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 72,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "06ee1a56-65ae-4ef1-123f-4ee1ed0eb164",
              name: "selected_note_id",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 99,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "1847550f-d2fe-0125-d86b-c10a1f3cd82e",
              name: "tag_string",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "e26a715f-010d-b76c-29cd-c800bd13d697",
              name: "title",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "3d848168-b705-fda6-e37f-3d4dbb97f0f1",
              name: "view_count",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 67,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "4706c39b-857c-5b94-aa41-b75e602aa858",
              name: "vote_count",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 67,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 2435,
            top: 1050,
            zIndex: 38,
            widthName: 60,
            widthComment: 60
          },
          id: "76b39dde-ad1e-c1c6-e00c-11a839a1f1bb"
        },
        {
          name: "category",
          comment: "",
          columns: [
            {
              id: "8fac5d63-9cc5-34d9-67b8-4bc23179e450",
              name: "code",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: true,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: true,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "d88ef011-ef2d-16cd-8cb6-47feacabc58f",
              name: "version",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "552383bd-f93e-1144-3fec-0dbce568c043",
              name: "anonymity",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 64,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "d4ef34ed-a136-c90d-260f-888c0d3dfd40",
              name: "date_created",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "ed495e7a-7532-1ee5-fa64-5f91dc72f47f",
              name: "default_label",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 76,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "988615f4-61fb-08da-e9a0-6b4e9337cced",
              name: "enabled",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "23fc92dc-cee3-1b93-2c1f-2a1fb49d0a87",
              name: "external_link",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 75,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "40334d6c-52bc-fa79-46a7-01266d0e9bb4",
              name: "icon_css_names",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 93,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "8ec4630a-485c-4bd5-5b4c-820324eae36c",
              name: "isurl",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "fb56b4bb-74a0-f654-760e-4ead7638875c",
              name: "label_code",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 64,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "7c8a2c1a-9bf1-544f-e1ee-b619f11dab95",
              name: "last_updated",
              comment: "",
              dataType: "DATETIME",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 63,
                widthDefault: 60
              }
            },
            {
              id: "c04a347c-0d1d-3ba3-6d21-0a1813691e93",
              name: "level",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "aaabf72b-6e0b-e74a-98f9-df388a74b002",
              name: "parent_id",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: true,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "acbd2439-bb95-f581-6477-0c95d807e59f",
              name: "require_tag",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 68,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "a59ad543-45c9-fa6d-8f7e-c6ede9c79e55",
              name: "sort_order",
              comment: "",
              dataType: "INT",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 62,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "f444738f-eecb-472f-7207-a54af3713c74",
              name: "url",
              comment: "",
              dataType: "VARCHAR(255)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 90,
                widthDefault: 60
              }
            },
            {
              id: "27b3873b-92a3-3e0b-20fe-732c50c3f94a",
              name: "use_evaluate",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 77,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "d39ac55f-3f78-86fb-0b07-6bf5efe2f26e",
              name: "use_note",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "9f9fda27-d4a4-14fe-340d-f32a82395bea",
              name: "use_opinion",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 72,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "eeb728df-1b75-700c-7043-85b82d5b77fc",
              name: "use_tag",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "e987d46b-01a9-2c35-a800-caaac72197db",
              name: "writable",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: true
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 60,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            },
            {
              id: "2c5eb7c9-2b76-28d1-bfb7-943763468bf3",
              name: "write_by_external_link",
              comment: "",
              dataType: "BIT(1)",
              default: "",
              option: {
                autoIncrement: false,
                primaryKey: false,
                unique: false,
                notNull: false
              },
              ui: {
                active: false,
                pk: false,
                fk: false,
                pfk: false,
                widthName: 129,
                widthComment: 60,
                widthDataType: 60,
                widthDefault: 60
              }
            }
          ],
          ui: {
            active: false,
            left: 2910,
            top: 1050,
            zIndex: 39,
            widthName: 60,
            widthComment: 60
          },
          id: "31c33ebd-6cf0-9ae8-f1a4-1565d308b8e5"
        }
      ],
      indexes: []
    },
    memo: {
      memos: []
    },
    relationship: {
      relationships: [
        {
          identification: true,
          start: {
            tableId: "31c33ebd-6cf0-9ae8-f1a4-1565d308b8e5",
            columnIds: ["8fac5d63-9cc5-34d9-67b8-4bc23179e450"],
            x: 2910,
            y: 1310,
            direction: ""
          },
          end: {
            tableId: "76b39dde-ad1e-c1c6-e00c-11a839a1f1bb",
            columnIds: ["eeffd857-df71-e614-ca11-3a3c0ae0df2e"],
            x: 2851,
            y: 1299.75,
            direction: ""
          },
          id: "db105cf5-b713-676f-7c15-4fe827e48e0c",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "bde0d395-1f6e-8fad-535c-e4b845f5c73f",
            columnIds: ["0a6ab052-eac7-6704-ff49-baa8637ab822"],
            x: 3187,
            y: 520.546875,
            direction: ""
          },
          end: {
            tableId: "76b39dde-ad1e-c1c6-e00c-11a839a1f1bb",
            columnIds: ["9befb714-b40a-ce51-9599-bc9e636d5752"],
            x: 2702.428571428572,
            y: 1050,
            direction: ""
          },
          id: "a1ab4c50-7959-5136-0081-657d333c2e44",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "bde0d395-1f6e-8fad-535c-e4b845f5c73f",
            columnIds: ["0a6ab052-eac7-6704-ff49-baa8637ab822"],
            x: 3187,
            y: 493.984375,
            direction: ""
          },
          end: {
            tableId: "76b39dde-ad1e-c1c6-e00c-11a839a1f1bb",
            columnIds: ["f70ab7e6-da08-1aa6-2091-b3c6e87e8939"],
            x: 2761.8571428571436,
            y: 1050,
            direction: ""
          },
          id: "d27ee0c9-fbf7-20f7-1380-18edf7852e6f",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "b40bda49-78b5-95f5-9fe6-2d6d6e7f46b4",
            columnIds: ["cde0049b-4c87-6122-1a1f-1d21f6c68a04"],
            x: 1861,
            y: 1308.84375,
            direction: ""
          },
          end: {
            tableId: "76b39dde-ad1e-c1c6-e00c-11a839a1f1bb",
            columnIds: ["088c0d13-323b-95cb-0fa6-9643c4815515"],
            x: 2435,
            y: 1091.625,
            direction: ""
          },
          id: "dc280469-7601-f038-ba5b-bc6c291ec61b",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "b40bda49-78b5-95f5-9fe6-2d6d6e7f46b4",
            columnIds: ["cde0049b-4c87-6122-1a1f-1d21f6c68a04"],
            x: 1861,
            y: 1355.90625,
            direction: ""
          },
          end: {
            tableId: "76b39dde-ad1e-c1c6-e00c-11a839a1f1bb",
            columnIds: ["06ee1a56-65ae-4ef1-123f-4ee1ed0eb164"],
            x: 2435,
            y: 1174.875,
            direction: ""
          },
          id: "fcd847df-e9ea-3bf0-a4dd-6a4aec52ebd5",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "f83416a1-3f0e-c292-a40d-51bb3ae72dcc",
            columnIds: ["f5d69dd1-04f1-c23d-5340-cfe906f08239"],
            x: 1920,
            y: 1415.3125,
            direction: ""
          },
          end: {
            tableId: "a41506e3-20b1-b67d-ee82-e3fd5609adb0",
            columnIds: ["4c6b94a0-0188-943b-c119-43c9aca850ed"],
            x: 397,
            y: 105,
            direction: ""
          },
          id: "5ddd24ad-cada-7d00-5f87-6cf2dbd9c719",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "d8e93818-2ad2-d9e6-72f2-6805e267f4e1",
            columnIds: ["079a8657-c7eb-1baf-7b3d-9814df783577"],
            x: 238.5,
            y: 238.5,
            direction: ""
          },
          end: {
            tableId: "a41506e3-20b1-b67d-ee82-e3fd5609adb0",
            columnIds: ["d868c8a9-8145-114a-5a9d-fdf53d545dbb"],
            x: 0,
            y: 0,
            direction: ""
          },
          id: "6f89c1ad-52c8-68b5-8d26-6691e08a6b8c",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "0059ccf8-a317-cae8-7888-c23de771ad75",
            columnIds: ["2bff8d2a-a191-3fe9-4f8b-5efe8226722f"],
            x: 0,
            y: 0,
            direction: ""
          },
          end: {
            tableId: "4c744c49-4579-c548-5e0f-454c578037bc",
            columnIds: ["9885e4ca-7b68-29c2-fa63-2b732ed8c4b6"],
            x: 1739,
            y: 314,
            direction: ""
          },
          id: "81f425b9-bfa1-2f9f-78dc-fa1c02a38c87",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "bde0d395-1f6e-8fad-535c-e4b845f5c73f",
            columnIds: ["0a6ab052-eac7-6704-ff49-baa8637ab822"],
            x: 3187,
            y: 626.796875,
            direction: ""
          },
          end: {
            tableId: "8795e11d-a105-7907-b9dd-c7763f3f6271",
            columnIds: ["e9d2a44d-c0ef-7c12-da87-b21b71cb2805"],
            x: 828,
            y: 105,
            direction: ""
          },
          id: "87265b40-0ab3-1fc7-3660-fd720e3291ff",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "41369993-006b-037d-7a21-e0791df6220c",
            columnIds: ["d5916a15-610f-6d1d-37aa-e87947960609"],
            x: 604,
            y: 447.5,
            direction: ""
          },
          end: {
            tableId: "8795e11d-a105-7907-b9dd-c7763f3f6271",
            columnIds: ["5211dc4e-7688-a8c7-fced-bfd651753c82"],
            x: 642,
            y: 160,
            direction: "bottom"
          },
          id: "5fb6e5ec-76da-6415-878a-9d67be78a0c6",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "bde0d395-1f6e-8fad-535c-e4b845f5c73f",
            columnIds: ["0a6ab052-eac7-6704-ff49-baa8637ab822"],
            x: 3187,
            y: 533.828125,
            direction: ""
          },
          end: {
            tableId: "8ab32e75-e219-b7e0-d125-d987c3bf0277",
            columnIds: ["c07fa9f2-4c82-8e75-343b-3d95196412fd"],
            x: 2148,
            y: 314,
            direction: ""
          },
          id: "2a48ef7d-38e7-b79f-7438-7ce7397a851f",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "f83416a1-3f0e-c292-a40d-51bb3ae72dcc",
            columnIds: ["f5d69dd1-04f1-c23d-5340-cfe906f08239"],
            x: 2034,
            y: 1050,
            direction: ""
          },
          end: {
            tableId: "d0162089-5957-561e-3d3d-fcb9b4d7795a",
            columnIds: ["4b7f8e50-67b0-8ece-f26c-c09aae88af3c"],
            x: 1810,
            y: 543.5,
            direction: ""
          },
          id: "a9333d4a-a8e8-c13e-056b-796f04811c5a",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "cc0d4c9e-a054-65a4-e198-ffd55d52c0f0",
            columnIds: ["d1aeecb8-9719-8947-7c7f-7fa68707cf7a"],
            x: 1195,
            y: 718,
            direction: ""
          },
          end: {
            tableId: "1ec9a90f-cd0d-c5a6-0ab6-3b9f0e95971c",
            columnIds: ["6fc7ab8f-1bef-31ba-1153-ec2a6ee0da9d"],
            x: 1091,
            y: 160,
            direction: "bottom"
          },
          id: "bf57ba2a-fedf-130e-f6ad-ed2a21d076f1",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "41369993-006b-037d-7a21-e0791df6220c",
            columnIds: ["d5916a15-610f-6d1d-37aa-e87947960609"],
            x: 804,
            y: 447.5,
            direction: ""
          },
          end: {
            tableId: "1ec9a90f-cd0d-c5a6-0ab6-3b9f0e95971c",
            columnIds: ["1d675e2d-e431-b135-31fa-2d1a7416c8c4"],
            x: 887,
            y: 105,
            direction: ""
          },
          id: "5fe76013-0b2a-735a-d552-bfae069aeb14",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "b40bda49-78b5-95f5-9fe6-2d6d6e7f46b4",
            columnIds: ["cde0049b-4c87-6122-1a1f-1d21f6c68a04"],
            x: 1653,
            y: 1050,
            direction: ""
          },
          end: {
            tableId: "0ee988e5-da04-fe94-b7b8-b9f4869527b1",
            columnIds: ["46b407d5-0d76-0562-270d-a0c384463188"],
            x: 1543.5,
            y: 160,
            direction: "bottom"
          },
          id: "5bfe4011-f4a7-59a2-ee54-fec24c3c703a",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "3807a00b-23dc-6b36-12fc-cc105a7e9aa6",
            columnIds: ["a3e3ea4d-1e1e-072a-72f7-1080b2af1169"],
            x: 2152,
            y: 718,
            direction: ""
          },
          end: {
            tableId: "0ee988e5-da04-fe94-b7b8-b9f4869527b1",
            columnIds: ["b007a58b-d3da-8b4c-4204-6539ad5a0ce6"],
            x: 1733,
            y: 105,
            direction: ""
          },
          id: "2fd8653a-e21c-a7a4-6b0d-5984eb2458a5",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "fda6b3f6-13b2-698c-5f5f-2bd26e10aa2b",
            columnIds: ["da1e4d3d-e0b8-6bb0-dccc-0a1b9dc127f0"],
            x: 2857,
            y: 855,
            direction: ""
          },
          end: {
            tableId: "fdcb64a6-dd2c-6b80-7ea8-ab84e352df18",
            columnIds: ["a6627b14-b493-2bcf-8911-2e15e17c92d1"],
            x: 2263,
            y: 543.5,
            direction: ""
          },
          id: "dc7b338b-c744-e296-16c3-d7d9165b7f58",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "d0d04c18-7f81-cd9f-8af4-493c9b4b2318",
            columnIds: ["f79cdcf6-d862-91e7-ca36-07d24fa18e98"],
            x: 1283.5,
            y: 1050,
            direction: ""
          },
          end: {
            tableId: "cc0d4c9e-a054-65a4-e198-ffd55d52c0f0",
            columnIds: ["482894fa-5432-e281-9d1c-d94dd90c3438"],
            x: 1195,
            y: 971.5,
            direction: "bottom"
          },
          id: "b82a1c42-2b59-c130-8b10-fa93b6cfb7d8",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "f83416a1-3f0e-c292-a40d-51bb3ae72dcc",
            columnIds: ["f5d69dd1-04f1-c23d-5340-cfe906f08239"],
            x: 1920,
            y: 1310.9375,
            direction: ""
          },
          end: {
            tableId: "91db363d-9613-3d98-5d32-7b95626945d8",
            columnIds: ["4f3636c8-dbb5-a73c-a4fa-d615e4629cac"],
            x: 445,
            y: 533.25,
            direction: ""
          },
          id: "cc8edd85-69b1-e165-1be9-7f95f65c5c5d",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "b40bda49-78b5-95f5-9fe6-2d6d6e7f46b4",
            columnIds: ["cde0049b-4c87-6122-1a1f-1d21f6c68a04"],
            x: 1445,
            y: 1363.75,
            direction: ""
          },
          end: {
            tableId: "2de64cc2-6a86-c657-3c94-fe68ad42d27f",
            columnIds: ["65ebffa9-2f9b-8407-470a-fafafdc82ac4"],
            x: 464,
            y: 892.75,
            direction: ""
          },
          id: "b67fc301-0169-3b12-7b82-8543f30ee0d0",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "bde0d395-1f6e-8fad-535c-e4b845f5c73f",
            columnIds: ["0a6ab052-eac7-6704-ff49-baa8637ab822"],
            x: 3187,
            y: 640.078125,
            direction: ""
          },
          end: {
            tableId: "2de64cc2-6a86-c657-3c94-fe68ad42d27f",
            columnIds: ["490da600-199a-90fd-17fd-d978f0fbefc7"],
            x: 464,
            y: 776.25,
            direction: ""
          },
          id: "17a12e05-0dce-da32-3d67-5f27c43e642e",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "bde0d395-1f6e-8fad-535c-e4b845f5c73f",
            columnIds: ["0a6ab052-eac7-6704-ff49-baa8637ab822"],
            x: 3187,
            y: 507.265625,
            direction: ""
          },
          end: {
            tableId: "07bfad1f-eda0-51a9-ff86-fc3a4a79df0e",
            columnIds: ["1db4d234-78d4-3e14-cbad-5dbbe071e057"],
            x: 2574,
            y: 314,
            direction: ""
          },
          id: "8add09aa-1163-5810-efd1-dd3fea68105d",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "76b39dde-ad1e-c1c6-e00c-11a839a1f1bb",
            columnIds: ["0ba9cf47-57e1-84ac-7526-56e5f47222ef"],
            x: 2643.0000000000005,
            y: 1050,
            direction: ""
          },
          end: {
            tableId: "07bfad1f-eda0-51a9-ff86-fc3a4a79df0e",
            columnIds: ["fb300d91-06ab-51ca-0fc8-2319c3fcac84"],
            x: 2390.5,
            y: 389.5,
            direction: "bottom"
          },
          id: "356eb3a1-bc31-10e9-1044-fa1102392fb9",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "31c33ebd-6cf0-9ae8-f1a4-1565d308b8e5",
            columnIds: ["8fac5d63-9cc5-34d9-67b8-4bc23179e450"],
            x: 3336,
            y: 1050,
            direction: ""
          },
          end: {
            tableId: "31c33ebd-6cf0-9ae8-f1a4-1565d308b8e5",
            columnIds: ["aaabf72b-6e0b-e74a-98f9-df388a74b002"],
            x: 3356,
            y: 1070,
            direction: ""
          },
          id: "e797d9e1-922b-5449-2cbf-3ed0b64d743c",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "76b39dde-ad1e-c1c6-e00c-11a839a1f1bb",
            columnIds: ["0ba9cf47-57e1-84ac-7526-56e5f47222ef"],
            x: 2524.1428571428573,
            y: 1050,
            direction: ""
          },
          end: {
            tableId: "1961865a-6149-3d6a-cdfb-05698344ee19",
            columnIds: ["d06f3e9c-b452-3eda-28e0-333690e528dd"],
            x: 2512,
            y: 639.5,
            direction: "bottom"
          },
          id: "b42fee66-e051-4168-dafb-58cde1dc5896",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "f83416a1-3f0e-c292-a40d-51bb3ae72dcc",
            columnIds: ["f5d69dd1-04f1-c23d-5340-cfe906f08239"],
            x: 2262,
            y: 1050,
            direction: ""
          },
          end: {
            tableId: "1961865a-6149-3d6a-cdfb-05698344ee19",
            columnIds: ["76dcfa97-e4b9-b194-e424-dffcfdd9f724"],
            x: 2322,
            y: 591.5,
            direction: ""
          },
          id: "b2b6cdb2-1a84-5202-7039-baf056a95993",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "b40bda49-78b5-95f5-9fe6-2d6d6e7f46b4",
            columnIds: ["cde0049b-4c87-6122-1a1f-1d21f6c68a04"],
            x: 1861,
            y: 1214.71875,
            direction: ""
          },
          end: {
            tableId: "1961865a-6149-3d6a-cdfb-05698344ee19",
            columnIds: ["b4621763-f6d2-4610-0642-c5ee8bae3d0b"],
            x: 2322,
            y: 495.5,
            direction: ""
          },
          id: "c1813761-3d11-d11c-9ddd-2c8cd6caf13d",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "0dad4397-b6d2-3722-0c4d-17862403afce",
            columnIds: ["3b3074ab-3a09-833a-7326-28fae47a3f1b"],
            x: 938,
            y: 881.1000000000001,
            direction: ""
          },
          end: {
            tableId: "efd24bb0-4d34-3665-6cce-0bdbf6d98c56",
            columnIds: ["7d3ec237-b951-0735-bde0-a22dbfc255eb"],
            x: 1452,
            y: 844.75,
            direction: ""
          },
          id: "0cc77be0-3ba9-4114-cfb2-31237c239cc0",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "76b39dde-ad1e-c1c6-e00c-11a839a1f1bb",
            columnIds: ["0ba9cf47-57e1-84ac-7526-56e5f47222ef"],
            x: 2821.285714285715,
            y: 1050,
            direction: ""
          },
          end: {
            tableId: "31b3c2be-e465-e50f-338d-dd66b1f9be46",
            columnIds: ["e2f49064-0215-4ac1-8acd-4e5ab32ebe0f"],
            x: 2163,
            y: 105,
            direction: ""
          },
          id: "64ab4487-432b-d319-8211-a5042d371599",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "41369993-006b-037d-7a21-e0791df6220c",
            columnIds: ["d5916a15-610f-6d1d-37aa-e87947960609"],
            x: 904,
            y: 490.375,
            direction: ""
          },
          end: {
            tableId: "31b3c2be-e465-e50f-338d-dd66b1f9be46",
            columnIds: ["94976424-e65a-b763-997d-7e590af348f7"],
            x: 1792,
            y: 105,
            direction: ""
          },
          id: "6a509440-6e16-ba46-6cbf-212b4b8b861d",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "0dad4397-b6d2-3722-0c4d-17862403afce",
            columnIds: ["3b3074ab-3a09-833a-7326-28fae47a3f1b"],
            x: 938,
            y: 834.5000000000001,
            direction: ""
          },
          end: {
            tableId: "428bc63c-c89a-9264-885f-a274531ac29d",
            columnIds: ["069ca746-6e00-f142-f5c0-d8dfb4f01bef"],
            x: 2633,
            y: 351.75,
            direction: ""
          },
          id: "e0266e20-15cd-03a1-d8f0-5dd32adca035",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "04ec5085-835a-3817-1ee0-16ff9bcd2dd3",
            columnIds: ["8a5eb629-fded-5803-146c-97f6c87c6839"],
            x: 2569,
            y: 132.5,
            direction: ""
          },
          end: {
            tableId: "428bc63c-c89a-9264-885f-a274531ac29d",
            columnIds: ["9837c35c-b920-019b-7dc0-3d41d1c0a1be"],
            x: 2633,
            y: 276.25,
            direction: ""
          },
          id: "1c8fe2a1-5e6f-615d-82e8-43b60b273b19",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "76b39dde-ad1e-c1c6-e00c-11a839a1f1bb",
            columnIds: ["0ba9cf47-57e1-84ac-7526-56e5f47222ef"],
            x: 2583.571428571429,
            y: 1050,
            direction: ""
          },
          end: {
            tableId: "a0726e8e-d765-3127-7e56-46c0ad6ce980",
            columnIds: ["83caadd5-8093-372a-1724-42a8888569d1"],
            x: 2944.5,
            y: 639.5,
            direction: "bottom"
          },
          id: "f303c3a0-30b9-5585-0902-a9e7a1a2cd31",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "bde0d395-1f6e-8fad-535c-e4b845f5c73f",
            columnIds: ["0a6ab052-eac7-6704-ff49-baa8637ab822"],
            x: 3187,
            y: 454.140625,
            direction: ""
          },
          end: {
            tableId: "a0726e8e-d765-3127-7e56-46c0ad6ce980",
            columnIds: ["7ef6bd70-c88f-47de-3de5-b0aec435d43e"],
            x: 3128,
            y: 543.5,
            direction: ""
          },
          id: "3291a960-00b8-32da-86e8-4ce77994c2c4",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "b40bda49-78b5-95f5-9fe6-2d6d6e7f46b4",
            columnIds: ["cde0049b-4c87-6122-1a1f-1d21f6c68a04"],
            x: 1861,
            y: 1167.65625,
            direction: ""
          },
          end: {
            tableId: "a0726e8e-d765-3127-7e56-46c0ad6ce980",
            columnIds: ["f369a11d-f250-77b3-eaf7-efdee8c32169"],
            x: 2761,
            y: 543.5,
            direction: ""
          },
          id: "89e1d3a6-3c15-1910-ae5b-3574c88ec1bc",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "bde0d395-1f6e-8fad-535c-e4b845f5c73f",
            columnIds: ["0a6ab052-eac7-6704-ff49-baa8637ab822"],
            x: 3187,
            y: 547.109375,
            direction: ""
          },
          end: {
            tableId: "f83416a1-3f0e-c292-a40d-51bb3ae72dcc",
            columnIds: ["6a78d179-db14-f28d-c0ef-36d43de923c4"],
            x: 2376,
            y: 1363.125,
            direction: ""
          },
          id: "bb8b6a9b-0036-3074-59ef-92b1c60cffba",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "4daf5301-cca9-6d6e-9bba-12bfcb42c467",
            columnIds: ["ad773969-1568-5e18-1bdc-5146f4c7dde9"],
            x: 3310,
            y: 957.75,
            direction: ""
          },
          end: {
            tableId: "f83416a1-3f0e-c292-a40d-51bb3ae72dcc",
            columnIds: ["3261366f-f748-4e5b-cfb0-03df6f302449"],
            x: 2376,
            y: 1154.375,
            direction: ""
          },
          id: "a3c3cb82-dc1f-ffa6-0a30-70d9bcb877c5",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "41369993-006b-037d-7a21-e0791df6220c",
            columnIds: ["d5916a15-610f-6d1d-37aa-e87947960609"],
            x: 904,
            y: 576.125,
            direction: ""
          },
          end: {
            tableId: "829636de-aa66-1c8c-74a2-d76374faa190",
            columnIds: ["78362362-7fe9-e100-8525-42790ac6134c"],
            x: 3051,
            y: 314,
            direction: ""
          },
          id: "02a6c9f6-0b02-ba33-ff4d-5d272df3f2cc",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "4daf5301-cca9-6d6e-9bba-12bfcb42c467",
            columnIds: ["ad773969-1568-5e18-1bdc-5146f4c7dde9"],
            x: 3310,
            y: 820.75,
            direction: ""
          },
          end: {
            tableId: "0dad4397-b6d2-3722-0c4d-17862403afce",
            columnIds: ["2855f966-5950-ccf6-06f7-1abddf1ba2d6"],
            x: 938,
            y: 787.9000000000001,
            direction: ""
          },
          id: "10f9c6bc-9749-9145-0a8a-19770ac14c5d",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "0dad4397-b6d2-3722-0c4d-17862403afce",
            columnIds: ["3b3074ab-3a09-833a-7326-28fae47a3f1b"],
            x: 938,
            y: 741.3000000000001,
            direction: ""
          },
          end: {
            tableId: "4daf5301-cca9-6d6e-9bba-12bfcb42c467",
            columnIds: ["2e0acc7c-20c2-4abc-66a5-215b4fda05eb"],
            x: 3310,
            y: 752.25,
            direction: ""
          },
          id: "f1ddc0fd-f764-bb67-f3f9-a6d9b43f1937",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "04ec5085-835a-3817-1ee0-16ff9bcd2dd3",
            columnIds: ["8a5eb629-fded-5803-146c-97f6c87c6839"],
            x: 2569,
            y: 77.5,
            direction: ""
          },
          end: {
            tableId: "4daf5301-cca9-6d6e-9bba-12bfcb42c467",
            columnIds: ["9ed8c1e9-6658-a477-18ab-0e322e443018"],
            x: 3310,
            y: 889.25,
            direction: ""
          },
          id: "fad17e73-00f3-2f87-8d25-8ee666812b8b",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "76b39dde-ad1e-c1c6-e00c-11a839a1f1bb",
            columnIds: ["0ba9cf47-57e1-84ac-7526-56e5f47222ef"],
            x: 2435,
            y: 1258.125,
            direction: ""
          },
          end: {
            tableId: "b40bda49-78b5-95f5-9fe6-2d6d6e7f46b4",
            columnIds: ["6d91bd1b-586c-1e8f-583a-a6a988b7b4e0"],
            x: 1861,
            y: 1402.96875,
            direction: ""
          },
          id: "a8a34d05-4130-255a-c0bb-94b8ea9014be",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "bde0d395-1f6e-8fad-535c-e4b845f5c73f",
            columnIds: ["0a6ab052-eac7-6704-ff49-baa8637ab822"],
            x: 3187,
            y: 560.390625,
            direction: ""
          },
          end: {
            tableId: "b40bda49-78b5-95f5-9fe6-2d6d6e7f46b4",
            columnIds: ["cf316f27-1343-ec69-9c96-2a03462190a1"],
            x: 1861,
            y: 1073.53125,
            direction: ""
          },
          id: "6f485d55-cd06-c179-157f-6042a4602f9b",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "bde0d395-1f6e-8fad-535c-e4b845f5c73f",
            columnIds: ["0a6ab052-eac7-6704-ff49-baa8637ab822"],
            x: 3187,
            y: 573.671875,
            direction: ""
          },
          end: {
            tableId: "b40bda49-78b5-95f5-9fe6-2d6d6e7f46b4",
            columnIds: ["26905326-99a5-76d2-37bc-93f6a235fdb1"],
            x: 1861,
            y: 1120.59375,
            direction: ""
          },
          id: "22930768-9534-5fb5-b00c-b1222d722b89",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "f83416a1-3f0e-c292-a40d-51bb3ae72dcc",
            columnIds: ["f5d69dd1-04f1-c23d-5340-cfe906f08239"],
            x: 1920,
            y: 1102.1875,
            direction: ""
          },
          end: {
            tableId: "0e40a2e3-6762-2656-45e2-d4b9a24bb89c",
            columnIds: ["705b758c-f394-7552-e79e-bc0668e8ae55"],
            x: 1357,
            y: 533.25,
            direction: ""
          },
          id: "388028c5-7a28-3dac-71e2-10141ef53003",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "bde0d395-1f6e-8fad-535c-e4b845f5c73f",
            columnIds: ["0a6ab052-eac7-6704-ff49-baa8637ab822"],
            x: 3187,
            y: 653.359375,
            direction: ""
          },
          end: {
            tableId: "ef22b63f-3126-0b73-3043-35d898fc2649",
            columnIds: ["031e3cff-12bc-312a-af69-7c25780dfa00"],
            x: 444,
            y: 1095.6666666666667,
            direction: ""
          },
          id: "8210feb9-8f36-2302-cdfe-7e047c3db6b8",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "76b39dde-ad1e-c1c6-e00c-11a839a1f1bb",
            columnIds: ["0ba9cf47-57e1-84ac-7526-56e5f47222ef"],
            x: 2435,
            y: 1507.875,
            direction: ""
          },
          end: {
            tableId: "ef22b63f-3126-0b73-3043-35d898fc2649",
            columnIds: ["85de484b-b309-625a-8aa1-63fd5117ae38"],
            x: 444,
            y: 1187,
            direction: ""
          },
          id: "09887dce-d1d4-ff9d-e295-bf401951026b",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "b40bda49-78b5-95f5-9fe6-2d6d6e7f46b4",
            columnIds: ["cde0049b-4c87-6122-1a1f-1d21f6c68a04"],
            x: 1445,
            y: 1238.25,
            direction: ""
          },
          end: {
            tableId: "ef22b63f-3126-0b73-3043-35d898fc2649",
            columnIds: ["fe76f772-0839-be5b-29b2-06071f7a6fca"],
            x: 444,
            y: 1278.3333333333333,
            direction: ""
          },
          id: "2a7c6af1-dbc2-b259-638b-21962e500ac3",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "76b39dde-ad1e-c1c6-e00c-11a839a1f1bb",
            columnIds: ["0ba9cf47-57e1-84ac-7526-56e5f47222ef"],
            x: 2435,
            y: 1341.375,
            direction: ""
          },
          end: {
            tableId: "d0d04c18-7f81-cd9f-8af4-493c9b4b2318",
            columnIds: ["0f7197d3-02da-8fa5-958b-17b2d3ae8777"],
            x: 1386,
            y: 1207.5,
            direction: ""
          },
          id: "c0fee139-15ff-b0e5-9831-6854910b3fb2",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "0dad4397-b6d2-3722-0c4d-17862403afce",
            columnIds: ["3b3074ab-3a09-833a-7326-28fae47a3f1b"],
            x: 938,
            y: 927.7000000000002,
            direction: ""
          },
          end: {
            tableId: "d0d04c18-7f81-cd9f-8af4-493c9b4b2318",
            columnIds: ["c0de0b58-44f6-9e9e-ea2b-9b31169b278c"],
            x: 1078.5,
            y: 1050,
            direction: ""
          },
          id: "0f4cff69-738c-f4e5-9bea-7632a372a5b1",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "76b39dde-ad1e-c1c6-e00c-11a839a1f1bb",
            columnIds: ["0ba9cf47-57e1-84ac-7526-56e5f47222ef"],
            x: 2464.714285714286,
            y: 1050,
            direction: ""
          },
          end: {
            tableId: "aaa604b7-18a7-ac85-ec56-c4b6a4ee3a56",
            columnIds: ["a9672a7d-420a-593a-0c49-8e2ba9cfcf0c"],
            x: 2601,
            y: 971.5,
            direction: "bottom"
          },
          id: "8b94ad06-eac9-122d-af8f-3524b0c7c213",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "bde0d395-1f6e-8fad-535c-e4b845f5c73f",
            columnIds: ["0a6ab052-eac7-6704-ff49-baa8637ab822"],
            x: 3187,
            y: 467.421875,
            direction: ""
          },
          end: {
            tableId: "aaa604b7-18a7-ac85-ec56-c4b6a4ee3a56",
            columnIds: ["97d749b9-2e4c-b1b1-600b-5e123b253e03"],
            x: 2798,
            y: 908.125,
            direction: ""
          },
          id: "11beeb4d-163c-c14c-f848-92d4bde3a877",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "bde0d395-1f6e-8fad-535c-e4b845f5c73f",
            columnIds: ["0a6ab052-eac7-6704-ff49-baa8637ab822"],
            x: 3187,
            y: 480.703125,
            direction: ""
          },
          end: {
            tableId: "aaa604b7-18a7-ac85-ec56-c4b6a4ee3a56",
            columnIds: ["cad0ef67-0f31-3d23-93f1-1eb0c13b63fe"],
            x: 2798,
            y: 781.375,
            direction: ""
          },
          id: "e74ddd9c-e768-f429-c913-ae56a8e78464",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "b40bda49-78b5-95f5-9fe6-2d6d6e7f46b4",
            columnIds: ["cde0049b-4c87-6122-1a1f-1d21f6c68a04"],
            x: 1861,
            y: 1261.78125,
            direction: ""
          },
          end: {
            tableId: "aaa604b7-18a7-ac85-ec56-c4b6a4ee3a56",
            columnIds: ["01d20515-fcdb-a15d-c3b4-72e3086e14e0"],
            x: 2404,
            y: 844.75,
            direction: ""
          },
          id: "62fd5a9a-57d7-bef5-728a-6e4e762dc4be",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "76b39dde-ad1e-c1c6-e00c-11a839a1f1bb",
            columnIds: ["0ba9cf47-57e1-84ac-7526-56e5f47222ef"],
            x: 2435,
            y: 1424.625,
            direction: ""
          },
          end: {
            tableId: "b71cdc51-425b-fd21-5c2e-103c47b30b8f",
            columnIds: ["1b812281-1c12-5e17-a362-b8b4a362c805"],
            x: 917,
            y: 1187,
            direction: ""
          },
          id: "33918ee5-4c10-9499-53ee-23796afe79e8",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "bde0d395-1f6e-8fad-535c-e4b845f5c73f",
            columnIds: ["0a6ab052-eac7-6704-ff49-baa8637ab822"],
            x: 3187,
            y: 613.515625,
            direction: ""
          },
          end: {
            tableId: "b71cdc51-425b-fd21-5c2e-103c47b30b8f",
            columnIds: ["e53d31f2-7432-7747-ca46-3b7c018bb529"],
            x: 917,
            y: 1278.3333333333333,
            direction: ""
          },
          id: "2066add8-22c7-ae79-c95a-4b3b6aee48ec",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "b40bda49-78b5-95f5-9fe6-2d6d6e7f46b4",
            columnIds: ["cde0049b-4c87-6122-1a1f-1d21f6c68a04"],
            x: 1445,
            y: 1112.75,
            direction: ""
          },
          end: {
            tableId: "b71cdc51-425b-fd21-5c2e-103c47b30b8f",
            columnIds: ["88100d82-217e-761c-7b75-cc39b30f1137"],
            x: 917,
            y: 1095.6666666666667,
            direction: ""
          },
          id: "0d8a03dc-dba9-3c51-5643-9a2207beab1d",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "f83416a1-3f0e-c292-a40d-51bb3ae72dcc",
            columnIds: ["f5d69dd1-04f1-c23d-5340-cfe906f08239"],
            x: 1920,
            y: 1206.5625,
            direction: ""
          },
          end: {
            tableId: "41e193b6-0a0f-4824-5d6d-510b74996376",
            columnIds: ["e23db2b2-3642-b4c2-e08a-a814cc031ec5"],
            x: 833,
            y: 303.75,
            direction: ""
          },
          id: "ee51238f-c239-006a-7d47-e0012c062d5b",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "bde0d395-1f6e-8fad-535c-e4b845f5c73f",
            columnIds: ["0a6ab052-eac7-6704-ff49-baa8637ab822"],
            x: 3187,
            y: 586.953125,
            direction: ""
          },
          end: {
            tableId: "5150ec67-88aa-dd8f-bd70-f53e1b71ecf2",
            columnIds: ["db10b983-6448-e310-10bc-2661e7d2af05"],
            x: 1259,
            y: 336.375,
            direction: ""
          },
          id: "16f02d58-3a7e-9944-513e-54eb61390f3b",
          relationshipType: "One"
        },
        {
          identification: true,
          start: {
            tableId: "bde0d395-1f6e-8fad-535c-e4b845f5c73f",
            columnIds: ["0a6ab052-eac7-6704-ff49-baa8637ab822"],
            x: 3187,
            y: 600.234375,
            direction: ""
          },
          end: {
            tableId: "5150ec67-88aa-dd8f-bd70-f53e1b71ecf2",
            columnIds: ["a26b8353-4a13-15bb-d945-d2242ae99c1d"],
            x: 1259,
            y: 271.125,
            direction: ""
          },
          id: "8d6746e2-03be-6dfe-208e-0cd571c1b698",
          relationshipType: "One"
        }
      ]
    }
  };
  