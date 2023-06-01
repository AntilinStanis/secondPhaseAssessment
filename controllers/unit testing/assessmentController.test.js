const tranLogService=require('../../services/testingSchema/common service');
const CommonService=require('../../services/testingSchema/common service');
const SubcriptionService=require('../../services/testingSchema/subscription service')
const Controller=require('./controller');
const data={
    data:"U2FsdGVkX19cMAs+OV/BIq6tNC1bU0pNUjBRXPd1KfbYTYMiQeModTdgq5s5HkHVcxnxJ/eLvtmd7T5iabMZp2W14YN1TE5fC9/CL72TrAD9mADDipt+8FdfyTqseFtb0z9kGUm2XG2mJdYkdSGqD9C9LOHqlUfimKxKX17aLo/8sxYUtlAEd31/ex0MlxrXf03syabzBQ+HQZl8H5NqievM/gRSRMurdDoK47YnfapokQC3o1yxbsX+TgowYT3/z87Kx9ZSgt3wuY1nsOpI/99ThHIeFHu+4CqAxCccOdF1URDjL3mOvxoX3NP+IQ9N63vNA9LS2yKMRB2aipqEE9Sfn7++BiiXREoeb/jiph71PbhSXfvw0Kh82hnE/y0bpBxaAE3tb11drfNV8GSCGFqsKadRrP9VjhyYD57Xv+9D9YT4lNzPggZQt1pdZei29assS56xBEES2JzQU7ILvYJN4EQa8T/LkU8tnnRafsPUhnf1swWH2mpANLDRWd8/jYuITBTwh/EbGtPNiR0kHaO21rm3+Sw881R9dqaG4qHcjoQ+rATytxIQLRQpyFI0Z0i/lG1/RFQNBMm+sp9emxm5BC2ZyRWCzPIQuF+SA2tboQ3Xg7pr4TAeG5I6We5Bz9T9DK8jyOetQryCiTTqMC88NOx+RhBoBVELIBoZiHt9TTTEXTOo8e4xfsgPa8UEvpKem1usViGNlv4ZikEDNBeew9DA0cOffngkZblvJUgP+jg4O4GH91PWJBVMOteWlfBmw7XjhUlpgjKQB9DXBxYMkKB8PErBHo9lVr3X0vRLkJFbZqeR5yH1TGF0B2WjOVBMcWZnbE8W9kGXV/lgVQKu2sMXmQq+C4W1xWqVBha3WI+VXd8NpRQpD0MyrSVWw78jpr8q2gOH8Wg0TIjkC9rzfvWGe+CqBBfa28vrXDZAGDjTZpfmOkos6K9Kw9cWQOoKBU44TuubCzGe2+Zl3a0bcv73ab+KYb6cKs7xZeIoWIlD5r82kOLqnPIHAAur9e/G27w0lmmog7M7YyUHZEBXSi64T+qD2RSVph/YWdB6vB6/qMIWphL2v8rRPqPPBqE7roqfbLxOF272RkB0J2nOX4ULHXt7HUcT8IjVLA5SVMt+ZsbyCPdMKGp2ffHTc79MFm20Ez+XhtG+01qjGoQQhWBNXFvu7h6jIOhrLNxkYrPsZbjEbXydboMX6I55gpzOsacffcHUcMYCV5yKJZF/WUuUkvt/DhogTxRxjWisOgkl/zUAfUxdzrNIzprhpFB3oA0KTALx9NRrfAZSNlF14F6btQ1cfUyno67QedXgm5JMg7OyaEBHx3wJY/uJ+80KpjlkKs84Psj1cX+S75vixl7ltUgvgz82hFiuWvaXxxZtEPTresi9CUmbh/PMOJLD8z8ob7x299MKDeXb7F4wlSX7VC6AuvK6AjdVgwL+7jERGIPKPdttepLuEB8QawTJ03FDfAlCAWZLsui9h6JLw1i3vgKQ/uirQ/8IQDx4PTJNCBqD55FRSwYA3i0/Pzkgnl1t4YxZY53lBaHGq+UbvEzIg3YW7bM8CS895hjS/RCwHZ1QUHjQ1VmFHcQe7r3yNy58ocqt8J7OalEo2s31xXcQs9Bek/sh3Q/EQ4NhZ0tyqj9z1DOgEJCMYCa1TzQJ79juQPDTvsGZsRGIyjWCU5X9C8RM02u+kJYI4GX6mAqynO+Tjb54vrGuoMZzjmDLVJy8IIylP5MAj/Ox1dQPwRERtLMWjFxTt3jU64gzYWd5ljARm2E06gImKY68sTeQaa+1ViUdYX5mLDXWGr/8DShiqyphJ6zHaKEhUouodZ3QTXtBKVrzskQNZUzCW5K/cRVxiSsR/EERjcCVjRnqAh55Zy2thO+x7XBsaGjww4aRQ2L8FDvz0M1KNqfmIhsWkHpPnmgOhBh0MqOQNP/VOrF6rEfvS02W99HKP8ncUS+dAhAoWhkG3qGE0wMueD4f+exmD9gauOi7a9HJxpw1XCVLEebNHIlyGr7H8plPIHPTnfKF0x5Zejrw7YIeZEJ7TGnQhHLv7Y93YdGqwhOSUAky86f5GPZNltY+XA2QebGk+dFe/dxVTbXuq9km70EipheepgHpcQM/Xh8Of1h3+ftQB4j9/5l+3Li6Rq/Rmmhq5MibHQBS+l7o5H6encaplHZyuTqAe3VY4q3OjSt/La2ZktN8fZfHe8/LWAoGeq1obHiA6BU17Xn6IL8RuhD3mudAtYlPmzhTlL7iLoIekNWGiGKb34r/NF5UzEcqk/fG3ORpijLNKn2oxRKBfW0d2S6E6EpLrPMumo7Xc5p1cUd78cimzQWrZ3YXzS0f7ksT5NLb2OHg0ahxrplIu+coJbB1TNOiEI18m+m/09mxiehiMz+wrV2Z21ApCP7AHYGTtPPd7Vu9pP6A+hYiAsoirDOOb9aVg6flN4dHAUs3eBR4qMuRFOApeQnKO4ae8zKVXM5eOa1SeLWk9pFGZkWfUAngan0zvgwb3FIF1qv7z0RJnOvb93WLVWPfEYjkbFfRGFnuGBl1n4es8atM6tDMNM9Lami8mb8YSi5reB+twVo++fth4VikTY78+fEQ/nPK3mnQZnw60cGpIHC7D6oGOTwk+RnERH9RufARYd06Pp3FVs94PjMqOr0cxksI3U4Fy4wbc4cq/ZPYGMJml6R37pzA4+NhGlD8v25qc1MGhCx0WKIiytcjfqiRxcy7RdOts8IJFASJciq3qQGDqMmYNTFW6P0oX9vjFV3XMwckCf4Ga6ThrBeaxdl6E4IgKpC1yKqDbFLPpMGdkG4/yrpubYmgYjfEthBT6TYQhsBcNBvgsIXznqo1vw4nkZBDV/VIGH8KSpRTVJFdqcVagwKvehUUADwEavGQLxWFHwjb+yRA29Z+ZdY7ZkxaU4ny8MCJ/Cw+PGvBHGJMsi8zhVrtPub0iv/3+PR8CY+8fQCA9ScMCzcy5h+R0pPTDYsajkzlAAdbMDtxnmT4X3voFA8DNBB2qnY8tC/yJLQHe+hGhYvBsRCtVfdOE2kdfTVgJInJIlfm/1iHHI5PBI00QinD4N5QJTHrkDl3jPfbcHgfHEliIBaJlOoqKRBnahe3ULu7WXn4Ayx2QW/oLHG/VL8UN1wdVB+kN0ZGPMN3POjFpdQZsMqckfBal+6IzFZ8gXZPsi6IJizHxvCF+CoGtp3Zu3T3FXnbpmnc4chsx9qcWR+za34gRYl2DNd039UeG0sMs+L/g8o8v5EX8pfbHHtvo/xjrnIJ8pCKWnUgZu0uBNmxUGPjO8+Y6mh2pMefPZNIKb4K535g2JnEDhKTGuRIW/KsNJ2WES+QtHlewz6b2I8vFLGaho+iTiKA9amDnSg5MeTOtoEn4EJ7NdtaxwxKQMBU080D/PpwgPkETuKn2x8aEAk192bmFuRuvmon9DkvRvpczRElt9v05ZNGYwXqFkDVwXIwoAiL+fBDRbIWCarvf3xewUqRbxoAUVsRg4t6MfoHUJGEvZijiVxsUO6mi1iklJkahb11TgiAmsK850k2jT54Lbh64KNtgDao8aizN5l7pjUbnGW131E5QwivT2V2V6SLlc2m4S4CdM82wTJYfwAIIKKAGhwQoA7EggTnYIIocHVH7ZnJZfCdwbQ9nuREm/hJjBFcj1GKi09uUkOHqY3mw0Abkt8lcz9AbLNJ2Z+Snaqxu3ZDWc2JsMd0j5IyLvv4sT37PfD6vK7EFMumJDcMX90ScV5+ixWuHswtCEv5VmfhiweYetHriMzXJaSrwfl0+OOjw7AZk+H98Mhy//GQNGzcBD/SJTeAX+1vgKiUhQQw6Ym4xZI1m+AixJ9LaR/B3KH4yFVYtIpmLrJeEe6HtLCtm+6e2Qx1/1qezBiXIwMpOnfff8vsJYsfhVOdp2N2ckbNL59HthT5oFo8EeJYjxHV1p7i6KEBSd6oi2EuAJFDp9vWscVI9E0Od26JZgCR9f0sVfAD4iX1jllF2Z/LNUR7VYaP6AxwovlXkd0EzWvN1ENuk/NcefV8hvvCokASTJ+N+baVQB53SGN5wiHE8P2qgqx11dPyXjwR9//obyQzfukRCheCtXpvsLKyX2dC6Rh9f9PMSCNFNJHN948fpRl5AYpuDaDCZcxBTFXCiyL8hlw1tpdHUbJ1EtphlxHVuADC6rb/dgkYkDFdntYbmprwo0ugjqbPoiIZbM+es5hw5zMj5jUkKesCxvHL6gMIkmpQhdmaQrKv8ji4Cyqzq8L4IA+uNsQcwjHMZBbfyHTZTFtNJNyuZN7Vctv7RroRJtZo1u7BYEK2AYsmiW1jiNqwvIBH7dQwa1OO6TAuveOklr7w4v2s/XvR88ZnEXH3ZiVh7p0YwDEnnvvKL8D+sMFcwffe9GSzEgHxWQFleKqLXQjf+HDwLIwBUGh5iC0WXZMRkO5Z9fLcpD8GNOrB6WbemlqfCR4UGwhaBFUPOBG4ltML5fq2mw/dUR62g78XGaBIpwD9JIcENgVe8cCmqzMZJj5EJjYV59dx6saPbNEKnQS4J1dSwpehRMjQXJMalhIDoy37fBOs0/dV7wcjD1E9NSm9s44vX8jJ4hEaupsqNdEW3QkAMVPyZSE61Q68Le7DOG+n1XppQ5zE7XhbCIhQJBurNh2aVpEImhoCQVh4zsga6hvWagft/W5pv63V6WqiPbjh8UfwWKeezeJjHLE0JwpkimVA6qBgh2MLflV5phTLnIo3tpzUs0PZJZ2lFGpteUQ1woM0UArGvuUae0XD5Lfapcf0miC1dOgg+DqKYFcEtZfV+x2bzVIIbWunqgCGiqMkDCy9l8px+2qNwLsf9CjFmskwbPaydD4DdnR274+SIdrR9R/y6cZ/whT9bFBQeO0eDMwIe1wFwSocfECTw06eL/3wVT2VReZcDltXxpGiDG8/s6hJZ803+uk+r+kCF9pJBLjGhd9hkY6lDvVKlipw8wqtWAS0LGuJzKkEdhiAT8Nxh9mueaAedm2AqyTAEN4nu0dW8u/YQM6hgM9BflIoWMJG2IseKZFvGj5no3gIaRQxBsjBLcxVmyrE76DEkdyeZwHe5UvcVd/gKWLn6c7Ubs/6MeNss5a9xH8/HNek9WzB0XX7poE9YGUwCU0DNo/Sgmk8arn0ZPUO0PLnEuVlLcYKXOfZNCvISXbJq7yJemxRnbc27jB5TamMLhAWCyWjlppbn1frEskoqSIZL/lEt7e3ZWbGC+chq0raLLHwpjbqGg9tmzwFve1XnXgDM2ccU4v18Gv47U39SYvyE9DswMg4vaWrjDvKYKtgbJ8zq5NEUDeJfdBW5RVuzjPQKIMzyQuB+VaX1f6b/Tdk447FKD7Q1oA25srgRC4uV5qzUehYazqZK+rF9/jf42+AfasDX9lQA2qeF+YOOKwGPT/G3F3p31KVEQPGKHINnbT9NJTKKM+VA2Rr3jvW9ot0377ir+CS5gmFg1Sc13qd2hk7hYr4pi34kJr9ztt5UvEqUwnK3F7w1U5HkaF/yZW3Ciw07sFTihhVkJM+IOYnRtvKALUgesWPu0rA9MXX2E4zyWTNXBdX63pql0/vuT/Ba3onc2i6cJjv+LCeJZprQylGw9xDiPEAgB8beAP4YuXnIF51S99GmC47Yi/yXeY2ajhJpgjQnllRsUC96fNw76Q88DIxh2PV8rI5QT4vAwGjgkbS9R5bH+tPkM0H+kVGfKA8HKKkh87r1sH/o36uGHWgc6xA/b58k74Hh8f2Dw+rnVmBKrS18bxDKegK5p1UnRUAoXasTFUJqCCmq43JS6jdfN3jZ2nBrs7zZhS045YzOBy1rq7UawOqGugavb44Uwo/mxwThew/tYlI3JW3Dg0UFqY3cE/rjJXTFhbcNfm+Fin7PlymFZ6lltzTz4Si9GuJjjYQrObiuexj+85Rtj1hg84qnlPboUrU1sNynjVt42Bke3j0DBKE1YW9EzUnvbFHoHjUHKIUruBmfrHKd45FolQr+qaRdSMXbLveuelHqG3O4SGnRhfOhNwDA3rWaOdGj4B1R3jg/2oW9I0p/BB2fy4RhOC3jLlLMOyFX2XzGytUWoSI2CkMMHB0aCCg40MkK6YQ8zabhOcdgVSA6Wb0ShOfbAuvToJotDPR0MFqkV8bYUbagxyIl2b1YA/bTmsap/EAYtAHuu+BM6NBx27x9gK0oaXIMrcUF3rclxbDigNQ5hZkR6AO2O1m2YDIo8id7oP/hZTsd9Krb4equ0wCwHgKQ8+D4YhN3EAeAeTKPqRQx0WaRCfCyT98LfIgUCAIR22C3I/sVCpdJzxWBilGYt/C+yOvdnriLRIyHzPbg7H48pQn2aI03hUc2gLd+hbyd54y+o56qKGovmC68AlNnZkdZwkNEQeXTY3CHH9C7qK//EgxW/kTgV7LUZ8/nxURx45rC97veHevAs7I5yD0+/we7arGwgPOyTqP43KCdGD/U86JN9iBCZqg8l51zWNZXe9Zg1JNkWuXww6ND5w3EnEqQu2vKssHBnVM5foXWIHH3pQVm5vY4wykqA3AtUdqXiiaJ7DiWHvG/6TaUZTmNTX5A9yoDJ10L7wsytmSFMnRNCqILblFNOzxi+KAaZyMvKVUstqfSzT/l08F/ld+z00wu0N2CzKk5Yk8f8X03qoVSMiSfhXiYRPxdlsCpvzUnA/bH06/ANZ8brkoCHzkue/ScLEhSJGlB/yl9QpaXMGgXFcsm+fou5CSbEWIj2pJ8xZzdtUjtykYb5FzRNLLbm5aoxh8DDxJL6mqnOJOwkKn01g5VsY8j8NaM6Ae2GyswcE7UJWFmzqYNPIp+kb6lTaSwc1X3aGvmw830tYHeqSGEcNBZFBqJQgfPY4GBZQmX7TvHEgmFWBDzLH1zvfBeBpsjMhlKBCLEKE96dDNNW+gwStCeptSVWNZ00VN7OeLIISYVLaahxuZJasQIpg6/czKakU9paLs9SLASFMuhpReHRNpq+Obod12xROykYifcZFfTO57wvvpqpb4uedMNdUT7XFwEdpl6laikr+dB5rcoFn0pSZtaOgWwjlYc/vkQQTSYy6T/lrhTpW1jRSDPZmwaVY5NbdDh+iJ6EJjl3II3WmM2sP8O7kwsgFd+kF29EO+ZCi7zpXEXGPJS095tpUwXT9zgKPXjkQSv56AR++nhy7ceqplXs5HMOR93bffRnVseS95u1H60M9RvBUUpe+R+pLaN8SLbljnbnFFPLoXWAunM0/5ea9zbSWW0diN1CKc2ZDU9dArqjw3vTdmsALoacHsG7ff2Gr7X4f0PQrujU6UFU0hFB7pTxhaWgkE4lGDp7UNCF6r0oBICku2crZrdZahPNLyJ3izk2UtKyH/7NwPQ4hmTXk+kNUl/OJkXyKNxCdvjzrXamJKXILvMSDWjQCs4JnHddNRH7rKV1E2rXfU5/DzDB5iTguw900NK+TBXIN+tsGljDEAVpWk7rMyCwpcLFWWiJRl/n+w2V95fkWQ3Zd+BsawLmtcAuiG2sDbKJektCecB0yOjhA7GqQgfA0mzY39TSmEPt2zhqPmmb1E3IrpRUnk1aY3TQMzQxeK/cboouAtBV0c6Mc9xjxKpGoiiMLV1sgRQxNB2qXggmiiQt6sym3LmZS2QSv4GxOHK3gb0yzHYE3MMf0X9L5inpuE9ZCFtKRob1jy8P9EvnAv+hk1xVFO4geJ3h/fENryK+e312JgTX5g9QuwNnT6QiF6I+OdpR4HgUo0tW1ipqgGZY/clgThe+U3bS1Y6D7JTJHFUaGxr+mTnRFUjSNFttWMeAzCEc4SLCRKkpUUvf7Remtqmohr4eSDnKfGuAUP44hO7N2OHGIMwNDSTJW0hr6XDkBJxtpe4pg/6pqu4136sgYEnUukBrJQUJwaBYxPrvkJ8MD8SovMSdJEgO2oHCpzVBgJ7M4I7cy/Y4sbBIqWJK2be/cT1w7W30n7m8hE5tD34qAUJ3ydanN29BrblSkN4eo5AsftxB8x/y9t8AeiMWqJE80l3Kf7qtqpCv2DvbBAzZ4c3dZLRaOrz7keRtoMj/5ELLxuxXvfkG27j3vbb1BDCGu3Bu/gtNhUQKvlr6HnLeD/+x6kYbdB9pEKoDsEr46zETCOMd4rg7ZvyHHaRORLn1ByAofiwoQ0d7wlqAtJVLyyEYIhLf3WxkIYTeryHT//pQ45VBjMddUBkiu5aESofBRbzXxJyTWJldJZ3yDHcqCPO26XWgvdfR5vSSSvrFW8p9Bu6rh3cJgn7/WlVPGO2aVwZkQBHX9zKwQiUWPRgia6KX+v9cRo4gpetzwlcs160mL2PySjcIH/lT9oxfm8lBSmenHFVIAblw0hX3PPPZOLZDY+HF8zBwRnuRjn0vGWKDAlc8rxfIHXqwcVe5jZyOwLdP3R+m8Z9T5BS4B6V+5gQ+yxNducUkocqc79TRQ1/8osnV6T2lAUmwLcxM9D6xfmSlZYQnru5dIII9wFPV7+ybIP5oC4308tOEYx0CZ84/xRnfPepJyZhSH7Vzd/0CR+cKnUinewOMSLsB4cGH0oiApdEyf3YSnXH52wnUxoxS7UwPN/ACs34Ij5/ETb/i1tmQ1PCUbFmu6iq1/INvgv2qSNzsaXUoRb+fvffq4OFZD0U3064eEGrKsyosiWUWdjuD1LpLb5FXMNHwU+LXQwayb0iSQBf4Y0NEL+UY5BUYfV/YdJacebvugjGHpOmgSja2NtMqao/2N2xvtJ+sY/iCFv0K0B16SG+ml00JKU2ivueKCb5lWn2ipOjfJcffjXWangJbkYLVd7ZkVnGMSy6+Lk4v227L6RAyreGZ3keZiY/mJjENDRA9EM2jd8myqVpkXelz+xaYH2eKMecGDvOtVcne91hvf7XbEyVHobiVL1+F3nwWToYCBcBXCq0Uk5dm11rdrzfblZdaK+zOVq2654aTwmTClg0efdoKn3rgPavgs9OpHT6zfKcuwVynjpffxt/zDHiOGrcxyUpYiz3TcAhqxw2nMv80u5Q38ZJxaU/4LKA3VIfPHut8Jb0YO9/WIOxKkrMsN67c7jTfrXwwQPnxHkw3/MSBVJU+BDHoE+48LOuGXCxqyHgB+Etm2Sh5KI87wGMstLIn7AHfG5eCXIVqnGMXzxTMPmjnkgb7fqYMrtS8djQqm4DYxoKvNRP8FrmCVT9PAxjtJcyYYc1vVqgpWBsmFsISxUE+iL96eggsPQp36RRRoRPyWuuGJ+wnFEO51Q7iD4vxUYtr5zZ47r63jKdsX7FBbMrcK44blauYueXWvoASRibS7NM6wy/CuzoUq6VBvfbHnkY2KbywjFYdFUV7O27KvkoRt/4oHkou+8xnmbmR0bWVOQ0OIDdL1BHJ7gFO2h/pGgCAepWE2KfxFrYanGa0ZLGcAo99o2pqISJSq8qEjzV64k734Ze5Xv+rXV/EKVz01sfL66L2SZluw/YRO1IkBjY92fSog2uQvQBNzK9x9DFGXrWc5TO72gum+u/0MRbUKiKezIHIfrZgaP+/2MZ2l4nucNGO9h5Gq7Zir8EJLNgSX/3gyqNc3cPupXN6r0TF3OLXoNWe21PR7utPFTCcrSTEygRWGNX/JDA6zIFzoxhyeE7KQksHkKlXG6xouNDVeNgN9CG0nZ8anNNsW4OIuzJ85RPm0T9qSCyl6JG9xygjKg1HYYWcRelLheMbTwDi4xO832S1zYLb2zIYESp7eLhkCOaycR+rA4zGYikD9IP1e7AajdIQH8tqlxKqHgI5TJRCy/g2LJsnzscaU74uH5Uf8dpWrxNfc9F9lxs6vEFM9OGyukfBGXU5DtWAosZ6UrWRDt7G3NxJuzUTdjTo4QgNB9z1cHPJRtlzwt1ftyCMO+13CSDphf7EHblpxWTjobFTN4xZ7/LtRidrn/u9v9Eh6O5lMSOuqzYw2660fmPILC7KZ+TaNXA3Iosmmku1XQXVVebFAIn5sK7LnzL6uSVpsY3rMhhDa4VEyyLOjiaUvqLAaJGUe3VKxqQfYSbjQtfUeFHnvWlm/e+2Zp4n7oqroBpF1temuSeQl6waCYer9quBqTvNILFoHLE0GxKDexvUMMfitRrtaCnohnUzgk8FJ7ezu6QM42cFrI4iCu36TCYhBd6BkYbaIENA9i7sMvQVE7mdy+N1h+OL8BRtVg1DFbPgh6JFtfFGa4JvCxtogXRWfjWSqRccMtVE1dWcgfLn25dF/JeEvQFDT1R8fHqpYKvqrD0WFPKnPBF0HVhtU5cBFgcgliyAIvbG0hyfqR4Tc+10LHnkbE8n5bncWZJWjoN241tPY0AVKQTVhCNEgQFmPq/aO0EE14YF2ewTlQwgwnuyS8i1d+gA1WQr6orKNjWNq1SpNibo8tbRkQ72Zm6K0a4Cl3rDjSZQhe3orR3w4JWMBFXb8hbcNVjJCOiWw8mlcbyAy75/C6F9ZgE/PJIkwdyZSkuYLUoyCR59umLeA7te6rxWA5FqVZG45GSRxIi4ZPtUHoqAfPA6dq1WhzVYeVhcLSqESMoWk5eYOx2+Bzy2HILG6hlXDR2DEB1KMMOe0RLiIFH466Diy3GgRkcNwthpJ+7hfyp53HoOmx+wmRbfEloX8zcjAN+tUJ+DVIG6Ao9N0zcy7xGfa4boYQIEYLyAMfX3yxSxh1ARwG+nHEfktZRlR7noMzmSHCjovX930HbG02NrRA4A5uVSg7o32NrivtuYVPvetyDqlql3pxH8T7fqmUnv75sOdvIkQBEUwNdoUi6tfds0yx5MJMNwlm8a/sKLe90flghoIginPgVali19vLnDYvzB/G8PkaE94Gu7xRNBYS6VeMjdx4x6xc/dJAzx0ilfg0Ets/CGZy6j3F2YRTixXiFjqQX8sh277lyT/J8nYOkoneN071nGsN6kvls0fq5IzqU0urrUlDNxAJJvfl412TNYn5wYuPgMa9Y0L7izEBrwwv5YPrOlOidDxaLCFb3xAKR21zQw21MvoZPUMhq48oLCFcA45Ucgslx3tKF7OsCOfQuG2y+Ua0cqGQ6Ct4nMB/cA+x3BsWlon3jwPEm/HPTVZUzc020J94Hpb47fBwXaSQsMBnQoSsM2a07YLDQelStzdDXlgnyAo4kkf0XFmD50SBdTv3wZ5MOiLR+lBgj/bh39oBEebix8WUow6bRvcezHYYjGfV7FLxpGntYelx2K5O7e415Fk+UO32FLONhEgixdXt4nNpuP6djEqguNy+uJRQcuhb0wYuZNhqQh1Z9RX3qG+A43pEIw/FaaLf1OZN+ZNLSRMnGgsYBbEZuynMFA37c1PC7UMCNj9tqan2kLehmBJBY56mgLQscUUvgW5mADFvXwEmFkKMcq8JWWferzlO6qqeRXBd8Q0FHAKnSSdd4EmMdYGBieu+kH9h/rPNyZdJbu6s/pRbkruqvhG8e1RirbVh1lOz93lehXI3GGnfTGwvwWt0Dp9veSLJi5U+r2fSqD3E0XEeMYiVuWrBKBHILoF4KQKMU/+21my7MHO1NfntDFELugaxC4lpT1YRGG8rVxqtdRh1OOcgGuK/lHt4PgbCQM2Y4VTopaXeg462iu+FNZbM2D4vGoRCwTMkv/3w8qiBX2bXKv70cqSCuUZR1ZiMkv66u3Fm9jzWHVFW6fAR/TNo9cVs23Tk0HtZH9Mg2Z71kt0koxwwH2oCsGxnIUSl5TKWt+AMLSRlf2SYXfNny4OsxyPW6Quatvsl3N76fJYw3Bh6UGZtG2/rlsmV2X4qHTIaLzTz5z5eDJSZZ10ysbHdQQ3I+Dm/bkZ31poAsPzf1jIXprmjWOT9uob7ariRt9akull3o3AGIIn1xb0VBTt4s4dTvG3NnAmxeWrXR2456ix4nFmCpsk9EP18+lqDoXbUwIlViUiWVfAluAJ3p8Tdge3SLN0SnOenyyG6eLzlb2G/PdXHqipuCL+kZLpEc+gAy4AXihxxziymtecVGHFpl5iiknbIQVvvz0/Uu+UjLl1Y1ezb1OkV2z2mWyPNiq0dv4iZhbx4tjrm/Gi4fdJ28OnBtXeBD86ubBwCS4zY5r3vXxhKhiSMckHiqsQkmaPhTO+gFVTIpQU+tiV3KY6/p9zTTh16YnFAI6aloyMMagWziSD/FsBIH8lRMF4HShlyv+FlGxeQrfx/VJ0BcZE6jFr8IDqMYiZGBr4jEb+upMPm4hRATKa14ZqmJxG9CWCwYsytqwQV18B9d+LZF1lTavU5TaokN4ymjCfTGbmLYUiA4DNkw8AnGI/umV3o31rWZKr1d2W0bIafHHGMWSaXEaMP82e/yGWfvXc7bC/JkdOiUbd8uxhpI9LbP8B01BoayLoo1LO+38lro+hLtZNL5djTchA/ATLBTi7OHk86/fWFFsNDMbTfv7a6SdnC9XxQqgx5P2Kc/IzwJgDkSSBUAoe4v4s6l+BqgqvmOIyqJr3hHhAI5lFlwZewPQXPdiI+2q5hohkAhArSMHzY0XHBSxWmW2OPlIJO/bJ+I7Ygzxx4snrkljFWM2/IJ1vD4G253R3rgZxOyq97uWASB3tlsaxo65g5nINCtEO5bTod7lD6GEhffAWC7N/vZmZ29OYAxEKvGtH0WLSev+nlhpDgmRfhQM+nacxjBmTKjt1g2Nw0uZmw3xIqeB2VwSPHNgTG5pUpXAbi4k4IfctvuwL7R5GeuDGsjXKh7NQH+weuxqRTsWZzsYxsIAU29vHPoLfIv1bN1wh2Nbjw5qOrO7A9UrGAzQBRk49YcjBmb1QBSXGjeQ2G+C8KxZ/ZO49O9+dzNsourFZ8RLKPrmaPtDPOobcFKdjYY9yOP9NuLng9Y/iyjpNcViFy+0yuEO4aTkR0k9N69XFJmQyD0ZxvQS/rCzhRbCdVeIMC/inVhXOdyTkBM8zJeotQF5HsaDYQGfJnz4t4NaiFDFB/pXQffw5ktflbtXD4W/ELPcxpUhDl0/gJwOb9GWPhtPke8Gh/BiBwK0o7RDVPOhefASJI+3FoE/oYkkOOcXFbL39LnTnczbrUE8VdK7jUSMiAqDCEVW9hQkksLs+jgGVg3KB4wrc4UbCGEY9r5MWOX19dJBWD03GvOUkbS+PCLjDncoNTcZVbYx4jjLWCQtSJPA+Pzo/4onQUBq/EhgmL+NvwXMYvC6pJVMeJe300lhP1aWoOyDgjGrboPBl7OS+nl/37EUDtzwOisRlfEgIDs28jgWLuyPsrQbbP0bfYANzF7RMvYV0t0Q9GrN0iDMBtZ7rNtlcZjSWJOuRICdXKdvoDgpPBKJht3L6u9dle46SHaWSaRU3DJcofJzpBZEm5N/M9LmPRWGzQn5KRX6h9P7vDRQ4iCONsXr1iDIP4ekUAgv9CKfHkPnSRcD9MMV1/o2CADvnAVyzvmA+pl9aROb9D4sX3dEBjCKaUWBTtCzuF4FGz2FTLwKideAXHAE/FdO2wqsI0KzAdmQdhGT72pBiVsAFqQD9VrusgIEycDERvfTHhA2w/wxcBMAwdYjoi6yAY1BUkurV4FR+xaPq4lnP3KiFSsPd4RGwbGazIt8GHD+bkzVp53j+J7W6uX35vsJQvzlwrppNENdmwH0W7r2rUgvny+1toSR1aVBok4up+0HAcSE0So0D5Y5kXVg1KKRroCWXQFlg/PAOrOBis1Hb0NV0iCC4QM2pFOEhOZWBqTRYguuzTfi+CXWILjdNhht0UnX4j7I6US68uCVC9vs5/P0NzDUd+GDxd4JPS5OBsggQHbkHd1EBVR20lXbCsuAzWaNR5wG/l7Zz1cBb3m8+9aJAbCnlu5PIqpEaXYVX632qQ6lY6UwoQW4pxYap5SVAarZcpYPRO3IsOGZxBSQXvXfsDzqmNu6gLsbc0ND5boMQXZ/riESuvBcAzjsqFzDIVa+idfNz3DCd+j2pOr3OIXEnXS4ujbMT1tcBu7lifl+gtxF67UohNzznKHhBFUdu63hpMm/aKtkwC311r7YFfzWcFviV944A6GiwLceBxn/HGdXJGkBz/yC9iJKRAOaU8tHwezsXow2d4CYT79p768YZfGTuLy3VV1Pd2hPO1Mz0SayutE0mPhOuLHSp4cPLWWZARmGouK/VI9+wtHOvPlzQdJbzFpwMg+seU5D/53fwPFeySaYgxpQLK8D1nBsAZ45WAVU/zD43w48qsD2fG4CKyinsKk3dW9OIjRKmcAAvQpeSv9xMm82LnZ7zHBTHKduzZnTuonWH0Hyzud4iKH+OOcwq84SaMnIJzH5Zr6kW04h9Jx+3VCi0HZVkfhhfy4TSB4kHA/X4sZEtKVyzYwVsG4p0X5P4YUK2xsNFgNfm8q1OLfGetO4FsifGjQfwJCQtQduy5NRhzAVU+He6KZEcg1k3nXsFFiSokkuuEtaaSqsaZJEvSksM+mzBhNlcny/P+2HFovmozMKW1KgqjNd6GMY0xedh+iIlWf4jzfQsBG3Cly8ssnrwpG2rFyP8tgYmTy4+FFMyeRbnPm3yQF8lOxkFoGI/ZQGWXkVSqRvFAt7z0RsQ2Io5Gch0NwSz6F9IDz2NVTA8LBpcqk1v2DdRyscPhbAdE6iExDpXOM4tDBUpmNSpZ09ESTpjtuRzq89CxwAxj5GLmVQlBlY1djYuLmsruRkuY20vCWKGnl3PW2FSYP7VqZ3y4QSGb5oqqiQ5DZc9LoCI65u3oMasw46PmVzzC4HAjwlf35Dh3ec+LBlFm4+S3WHvsJEZAvTsm3wDM8SG2HKWaY5NSDwdpA+IY7dETdDbBQd8TXRz6PORk84JXX01hRTqsPmWJjz0j5RyJkLKZNOpKRQMzEhPNGbFyNTlPYNinUg69+M0xjEfIcc5eqdO7vdUB7dViPFQ9UdUH8PKyVzWcj1U0mZZvH7J3ubc1gZ+q9ptae4VWtGHyYj9TAET9c1bRHuD0kvAIaF93IWVFaSsmMvnUWqBwxZkN7FJClDt+M5vQRcoXhvoTXu38wTjuuMMNKKu7x7j+Ht7NgivKal8uItcBkDLMSurcM5P31/C05/hPm2/VF82HCw+P1mu64VKkE7ZvKi+toT0kmCXoe7cxX/ulH/ckqx7rV718jeYnHe9NKtYALuBP5eDN610Z5xwIx0Gv2CFuBhd1byiqw9Zew3LYpExuQR/TMpAA+iGpd2D3MfDl8qjpiSuqxpvV+FPoxLQfwM/XySopzIaqvQngDAuIye32xfF0aNRt2jcGK4Rs5XaJmB1AQR8YqV5ZkJ9yHGBmhsXi/2H1VJ0d2rvluK1ON3SyR72kOVevEXzVl+sL+nQFlCE1incnIFd0jEMM5ATMz7Z69Ww5iTmRIpkzDogbNI8dTGoge8/WPVwV8TyvlRKjXOj0h5FhYPr8KxkVsYvSrsUpVQFfRb+CmSsFYQTyayXuZcF6Lp3I/WcAHRRvWsfkqz7k0BwFcABP0sv0Dc7ilDqOM0z4xQK/eSpocPptAMNo7DmQ0MnZdGR5QQ8I8bMhnhN1fDPx58Tdm9MmtioQNNFn5voSavUt6mhzpvDRyx7fqRCt8aBfBPiJDf+qW7qqSXlJ4zTh7GiPR9GdJ30FLDRlTG1u+cUbbeJTGIGIUx9xa+2dtj6fkpmjTiJjeBd+f4R0oeyqnre44OWw7+gFaE7312uPL2tdp4BMyHinEAGicfvDje98uKhnKtltIxM1/FFVATLEBrg3NBW6bkdznMRryAySX8UJaCIlKkdQAk39qILDh55uIysASsoCrNMHOJuIWUKXCYKTloymbfEWJKi8wit1W9rZYNBE1+K8VXXHHFodPFdWhkRNTxcw/2nmgbQNkV9CEQ76SAU8Ybj6lGxZvcijfXDW5XlYaxUYK8VnlOzZqTgbjua/7NStw1t6++Cyh8evrfAo9lejegVc1IzDtudbwAsm/Tczy63Vjsitmpfl9nhgOYdOSRYa2UM+IHkxcacqCFF8pD7GnLiULcDY6y+GSfke2W1ZV3Q/L4/6e082uz35BUOpF9//WGyVVQxL15mmFYcd3TNoT1sFAY0KE78DMYekr7Jm19AKNBZZa/5ZvAsdEzkkQLRUc4YGFNLL0KYtEf9DJ7qwYFNIXGw0tRbQ1eJdRtmadnb0AoulTcPPvTqRg3uNavryebg5vHTOZ7nqo+r4cVcQ1JQ9wXFdLYR4gWjBszaiB9o7l+aIglVsabHpGdCq4G1oBTLU3hQYrVkjV8rdWnDiKLKyXu49XE1RKyYt679oP1IHjVEc5rojAZY8T6gsuyq8WkAS+TBd5R6k5xH+H6OqBsQC5ZaLhMj3AW87P21Y7TWs/3d+9H4sG8i9ooYtecs0FP7Y+FvrxCChjyFpy0GMaJnEQiKsw5UowiW9AhT/xdCWlbAzu/1TpAMo/ZB1ssKcedYLUqznk0RVzTwvFtCov7WrZm9uGmLecM6dOEROXGJvTGgbxMsHS8Y+KaFRBTefLMTLfy0O19qkEAO85uwC05ibF62eb6KlPi/c6vQj9txwxsKpR/Pp/rbXTfVWYtLw80cCSIzr4nKU0T+6Uoi5AKlX4oAteKaToFgnuOt7K+UFl6Nai+pTHEFVifxR0RmEFM7cp0GBVu3W1xncbJ/lf1QSFQhrGtgmbSX7oo/F54LRsAT92aRm4iTzelTjZ0Jo+rI0Z4I74mVKTWfNCK9s3MYiXQFagnkfjHW40MhdxWmmYyJLDbKyPYDZw0IKfoQK5Z0R9NqGP3Lvc8UKuquWSig8WOBO5rx9gpulqtIpXoEVy/TuDEG2CMte03LCzDqpvAhWa/yZ5hWdC9goyBPr2bg5NLEQkrp+9yZ2ppNiuXyfdgKJtQAC6MLbRYVsgkNGpe1T27k4wCrQQ9YC5A3a+YAvR/3pfEy5/MXEH6TDgE8glcQshiUCMlEMTYsDVqEKsDIu8Z0QuX2CbSRnuwtBWy+q0/aUqH/tmEF9ApuZ875plGPHvO9NUdaP8olbm9Cv1uwfIg4KG1xXXaWzo6KMHmszKT0dXhjV7BCUVQLax7uViG93VgCEG5AxQweLbB8KSXgMn4+dvYvQj7EKijWYXc+lwu64ce4H8WBEWP9JuMWPYX1rwCMuDlQMWkKfS/DqBAy2FLKKxSKY5mLqOnM1JJy7+/mvaUtmu3epZL8DGKg3FbfhEu15Ta4JzeidKMaE6/kIpekpC+9CFL3ekNHBldwSJ1jDD9/y39IE0xK/WVNNYxd0Kf5hsiMwSaL72C4y4t8NRwvl/lsbe1gIKvKXqk/YBYoXGvZ/6ez/6rqFoPCJ6YNbjhwomEd/gbhC42OWwglJRIKEFlg3n8yh7YhGt2LdF73qHQhDkJtVys0/T/G8scPk0aLpv8NcR5yDVGr7mpRtggZ3XGR0S+KFIYlHoq+7AEgYcwamYYge2mW/5qhDtcKnChdlF/+WXWWcxV3W7vWIriKjPpDMVhiV23fhZ6prdpT006ZJaZCuo+GJ+MBjGrmUT/nn1P1YhaYRq1CwFByVWFoxR1+P8bdXL86ujPTUnbpj/0fQHuneTU64ZHLWKS2ikz2w+xL3aeOfVChmSra0zny43NNLtAHeY7/05j5pxOXpo+SrOVMM/DiF6ixkwguG8aQNX9dY5ID81ue1ShFoYhsbV1rEzMpoPYHI10hUd1mK7qWa7iqyY/AH14wSTrq14FlljzzklESHsMaVwbPYCECkho/yGq95z3RdU/VJ+NJgxbyiRB2jCamLZ8OL3M8IRb3iE+4xQvpmxj9xY0g55luf9scIIQvNqdB21SybzIznAlJHtNy2rpoxTImdEP8IKdMd26dhcKN0zkzs82Rt3Sreln0l9Tkt2qmOlil7iO0jEdZRIEaBzBU6ALicFb/RpsvpH3fIpCpIYCUSzRqZ0ZGJZEs5QE4HgE4MoJTFjyFqDKr0ctfkHRhATrY7sSseK1l3Y4FjtyrzTbWSoZnyon/tpk/Ciin6b3JV0hzmx5W7zhV59wyKIzvqQbtUHi9wDSYWNI33FXZk4XbVkCRJQnEjmJxh98HcN4FVWQDB1DANvDUSdoJIRcPo6V4cjupPWqMT52w57+lm8/Pv4rfUXWPSdPGvFsqa+oE6Xdyj40lSCx7RL7rXy0SlgQZOZy0R7g53MLeKXFKv8OCXkh35UxJ0KsoesE4t3HMs5p84+/2TVMEY03Kz/rJeD4kQJvK9YbKhlXg+tI/pGIL7F0JJHESt52WbHkEEAeUr+8sXQ3KB3gJTb17eBFgPPRzVSZwjz/qvSOQDl4x3Cz9sxiGuZ3v8GYpxFILtsydRQSpZSUgJzmQfRIToyfQG3IcrlHVynZ1Kd1zhIVLLgQ3VoK5JMHLtm17QBsF3OW4uS51g12lPFIUj4cFfAcXYJ+pzGRvt2TV0npveEnFbsjK3B6poUWtmKei3YRHl70eMiOjhvW7LqXAhFBU8HxLu8T2kupKzhKGdDSCL1q5drt8lJvFvHUxwv+0Pw/hwAR0gLiIWpkstVt+VFiVJPBk/Wsx0dkxYXlaEjfeoaNOkMvJ5xuohcD27XZuTapdzHd2y4e0nRJIoCGf8QMl8AgHYCeklMV1GvW1K62i+fc4Q0fuUvB/D5Y1CK34sKN1MLe6MEEzYFVAnU6Zgez5riYnJpOBobQLQxZih988zL9P2wMlo3jNNwxpHUAuyIdJNTHKMicyq1NK1/DrEuvI4cjaz4bvpF+OEYDOFM/cVKrD3MKPAofHtMvyLbhquwh53cwvfz4wMs0hjMxRLZFfc6SSGPVOTfc0cZt1hA6ZLfiuSFKFQVjbWmPE8VyvmzPGLjeHhs077clPLKkzd534viI6pYeD50kUiPEt81+QF59r9BIVyMEEPf8ABKVvE82H7Nr7nzGWX71AN+IhtF7euZk3JBOXHHtZgvM8MsCDYEEL/m09AxUPD5UlBfMibUqPxN7VWWCUjfVsL3s56n/83L3FeS7NZtwjElV+zKJk8MqFxWn0FnnOCQwx3+LR/cmJZp0gNwVWUakIXT3RZN+j0a/X6eoCKQqp2QO4YgvTlKZxHnrheJZ60kh5r6IV+BpZ4BqOizJheazbJYV1F5ovCcghOkIJh1L3xlOBpAovPV0+J+Yqml3VaIDlNoaNKUUzDp93uyaIgSzm62CVgPiZ2yuLRC2ntzt/eN8qRICr44tFckoS8zaS+1r8C9D4ud/fyq19GifyzODbP/fJp8q2XDP22"
}
const mockRequest=()=>{
    const req={};
    req.body=jest.fn().mockReturnValue(req);
    req.params=jest.fn().mockReturnValue(req);
    return req;
}

const mockResponse=()=>{
    const res={};
    res.send=jest.fn().mockReturnValue(res);
    res.status=jest.fn().mockReturnValue(res);
    res.json=jest.fn().mockReturnValue(res);
    return res;
}
jest.setTimeout(1000000);
describe('Controller',()=>{
test ('generateSubscriptionDetails',async()=>{
    let req=mockRequest();
    let res=mockResponse();
    req.body="Hello"
   tranLogService.createSubscriptionLog=jest.fn()
   .mockRejectedValueOnce(new Error("Error"))
   await Controller.generateSubscriptionDetails(req,res);
   expect(res.statusCode).toBe(422);
    

})
})