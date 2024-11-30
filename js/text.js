var text1=['<span class="peter">彼得副指揮官：</span>艦艇準備靠港了，威廉，請你到碼頭與廠商接洽。        <br><span class="you">你：</span>是，長官！',
'<span class="hiba">海霸天公司員工：</span>跟您確認一下這次的服務項目，包括處理廢棄物以及補給燃料，對嗎？        <br><span class="you">你：</span>是的。',
'<span class="hiba">海霸天公司員工：</span>沒問題，預計三小時內會完成。        <br><span class="you">你：</span>了解，辛苦了。',
'<span class="hiba">海霸天公司員工：</span>這是這次船舶服務的發票。        <br><span class="you">你：</span>這金額沒錯嗎？',
'<span class="hiba">海霸天公司員工：</span>已跟主管確認過。        <br><span class="you">你：</span>怎麼費用這麼高？        <br><span class="hiba">海霸天公司員工：</span>會嗎？跟之前是差不多的。'];

var text2=['<span class="you">你：</span>嘿，你們在討論什麼？        <br><span class="lucifer">路西法：</span>下週艦艇停靠黑梟港口，我們要去參加朋友的派對，要一起來嗎？        <br><span class="you">你：</span>朋友的派對？好啊！'];

var text3=['<span class="george">喬治執行長：</span>歡迎大家賞臉參加我的派對，希望今天各位都能玩得盡興。',
'<span class="george">喬治執行長：</span>你好，我是海霸天的執行長喬治，怎麼稱呼你？        <br><span class="you">你：</span>執行長好，叫我威廉就可以。',
'<span class="george">喬治執行長：</span>冒昧請問一下，你在軍中是負責什麼勤務？        <br><span class="you">你：</span>在黃金艦隊上負責補給工作，靠港的時候常會和貴公司同仁接洽。',
'<span class="george">喬治執行長：</span>了解~那你在軍中服役大概多久了？        <br><span class="you">你：</span>差不多7年多。',
'<span class="peter">彼得副指揮官：</span>執行長、威廉，你們已經認識了啊！        <br><span class="you">你：</span>長官好。',
'<span class="george">喬治執行長：</span>對啊，想說趁著派對可以多認識一些像威廉一樣的優秀軍人啊！你怎麼這麼晚才來？',
'<span class="peter">彼得副指揮官：</span>抱歉，下禮拜艦隊要停靠寶石國，需要確認艦隊補給的細節，所以最近這幾天都開會到好晚，忙到不行。',
'<span class="george">喬治執行長：</span>好巧，下禮拜我正好要到寶石國出差，那邊我很熟，我可以帶你去一些好吃好玩的地方。        <br><span class="peter">彼得副指揮官：</span>好啊！威廉，不如到時你也跟我們同行吧。'];

var text4=['<span class="you">你：</span>長官好。        <br><span class="peter">彼得副指揮官：</span>剛才甲板上發出了很大的聲響，是什麼狀況？        <br><span class="you">你：</span>報告長官，附近的補給船因大浪撞上了艦艇。',
'<span class="peter">彼得副指揮官：</span>雙方船艦或人員是否有損傷？        <br><span class="you">你：</span>補給船和我方左舷甲板有輕微擦撞，無重大損傷，人員也都一切平安。',
'<span class="peter">彼得副指揮官：</span>那就好，這幾天海上風浪大，艦艇上陸續發生了一些小狀況，再請多加留意。        <br><span class="you">你：</span>是，長官。',
'<span class="peter">彼得副指揮官：</span>對了，我記得你有在抽雪茄，這個送你。上次艦艇停靠在寶石國的時候，海霸天的執行長硬要把這個塞給我，我也用不到。好東西就要給識貨的人才行，拿著！',
'<span class="you">你：</span>這太貴重，我不能收。        <br><span class="peter">彼得副指揮官：</span>只是個小東西，你不收下太不給我面子了。'];

var text5=['<span class="george">喬治執行長：</span>威廉，又見面了。這是你第一次來寶石國嗎？        <br><span class="you">你：</span>來過很多次了，但第一次到這個海灘，這邊好美~',
'<span class="george">喬治執行長：</span>可不是嗎？這邊不是那麼熱門的觀光景點，人比較少，環境清幽，我常來這裡放鬆身心。        <br><span class="you">你：</span>託執行長的福，這次才有機會好好紓解壓力。',
'<span class="george">喬治執行長：</span>聽副指揮官說你們最近有點忙。        <br><span class="you">你：</span>是有一點。',
'<span class="george">喬治執行長：</span>最近我們公司也是蠻忙，很多案子在備標。前幾天火麒麟港的標案不是公告了嗎？這次我們公司想要標下來。藍泰洋公司已經連續標到這個案子很多年了，也該換人做做看了吧！',
'<span class="george">喬治執行長：</span>威廉，你可別跟其他公司透露我們公司要去標喔！        <br><span class="you">你：</span>不會啦，我知道分寸。',
'<span class="george">喬治執行長：</span>你在黃金艦隊上服務這麼久了，對各家廠商的報價金額還有服務內容應該很清楚吧？如果你可以稍微透露一些訊息給我，不囉嗦，我現在直接匯30萬元到你的戶頭！',
'<span class="george">喬治執行長：</span>沒關係，只是好奇其他公司做船舶服務的報價金額是多少？        <br><span class="you">你：</span>詳細報價不太清楚，但印象中你們公司的報價蠻高的。        <br><span class="george">喬治執行長：</span>是嗎？沒高很多吧！',
'<span class="you">你：</span>我最近收到一張你們公司開的發票，金額是市價的兩到三倍。        <br><span class="george">喬治執行長：</span>畢竟我們公司聘用的人素質高，服務品質佳，成本當然相對也高。',
'<span class="you">你：</span>是沒錯，經營公司不容易。        <br><span class="george">喬治執行長：</span>剛開始經營那幾年真的是很辛苦，但現在還不錯，我們公司在整個船舶服務產業的市占率蠻高的。',
'<span class="you">你：</span>祝執行長的事業蒸蒸日上。        <br><span class="george">喬治執行長：</span>也祝福你工作、家庭、生活都一帆風順。        <br><span class="you">你：</span>謝謝執行長。',
'<span class="george">喬治執行長：</span>晚上留下來一起吃飯吧！今天主廚準備的是法式料理，有鵝肝牛排、焗烤蝸牛，還有煙燻羊肋排。'];

var text6=['<span class="you">你：</span>長官好，喬治執行長邀我留下來用餐，想請示您是否允許。',
'<span class="peter">彼得副指揮官：</span>離返艦點名還有2小時的時間，況且我也有受邀，你就放心留下來一起吃。',
'<span class="peter">彼得副指揮官：</span>對了，剛才看你跟執行長有說有笑，在聊些什麼？        <br><span class="you">你：</span>沒什麼，閒話家常而已。',
'<span class="peter">彼得副指揮官：</span>我們接下來不是要停靠火麒麟港嗎？如果廢棄物沒有滿到影響艦艇上工作區域的話，就先不用請藍泰洋公司處理了。然後燃料差不多補充到5分滿就可以。',
'<span class="you">你：</span>長官，這和表定流程不同，這麼做有什麼特殊原因嗎？',
'<span class="peter">彼得副指揮官：</span>主要是這幾天風向的關係，抵達火麒麟港的時間會比預期晚4~5小時左右。從火麒麟港離開後再過2天就會到黑鷹港，到時會有比較充裕的時間可以進行完整的船舶服務。',
'<span class="you">你：</span>黑鷹港……不就是喬治執行長他們公司服務的港口嗎？        <br><span class="peter">彼得副指揮官：</span>對啊，所以執行長說只要我們艦艇一到碼頭，就馬上派人進行船舶服務，以減少後面航程的延誤時間。',
'<span class="you">你：</span>真多虧有執行長全力配合。        <br><span class="peter">彼得副指揮官：</span>畢竟是合作很多年的夥伴了，就像老朋友一樣。'];

var text7=['<span class="george">喬治執行長：</span>這個鵝肝牛排怎麼樣？很不錯吧！        <br><span class="you">你：</span>非常好吃~',
'<span class="george">喬治執行長：</span>這家餐廳的主廚非常厲害，餐點的品質很穩定，不時還會變換菜單，讓人不會吃膩。威廉，這個焗烤蝸牛是他們家招牌的前菜，多吃一點。',
'<span class="you">你：</span>謝謝執行長，我自己來。        <br><span class="george">喬治執行長：</span>煙燻羊肋排我是第一次吃到，應該是主廚新研發的。        <br><span class="peter">彼得副指揮官：</span>很入味，羊肉夠嫩。確實來了幾次菜色都不太一樣。',
'<span class="george">喬治執行長：</span>上次你點的那個紅酒鴨胸，味道真棒！        <br><span class="peter">彼得副指揮官：</span>我等一下回艦艇還要值勤，如果有酒入菜沒辦法吃。',
'<span class="george">喬治執行長：</span>我知道，我剛才有特別跟主廚交代，這次的菜都不放酒。上次不一樣，是一起來度假的呀！        <br><span class="peter">彼得副指揮官：</span>所以這次甜點就不是提拉米蘇了。',
'<span class="george">喬治執行長：</span>對，因為那道甜點有加蘭姆酒，所以請主廚把甜點換成馬卡龍。        <br><span class="peter">彼得副指揮官：</span>威廉，你好可惜這次沒辦法吃到提拉米蘇，這家口味做得相當道地！',
'<span class="you">你：</span>馬卡龍也是非常好吃。        <br><span class="george">喬治執行長：</span>對了，我一直以為你們接下來的停靠點就是到黑鷹港耶！        <br><span class="peter">彼得副指揮官：</span>沒有，這次會先到火麒麟港，再停靠黑鷹港。',
'<span class="george">喬治執行長：</span>你這就不夠意思了，之前不是都談好了嗎？這兩個港口那麼近，你們先到火麒麟港的話，船舶服務的錢不就都被藍泰洋公司給賺走了？！',
'<span class="peter">彼得副指揮官：</span>你別擔心，威廉會負責統籌、監督、檢核還有驗收艦艇船舶服務，我剛有跟他交代了，到火麒麟港先做少部分的燃料補給，其餘項目到黑鷹港再做，不會讓你虧到。'];

var text8=['<span class="peter">彼得副指揮官：</span>威廉，剛才看你跟執行長有說有笑，在聊些什麼？        <br><span class="you">你：</span>沒什麼，閒話家常而已。',
'<span class="peter">彼得副指揮官：</span>我們接下來不是要停靠火麒麟港嗎？如果廢棄物沒有滿到影響艦艇上工作區域的話，就先不用請藍泰洋公司處理了。然後燃料差不多補充到5分滿就可以。',
'<span class="you">你：</span>長官，這和表定流程不同，這麼做有什麼特殊原因嗎？',
'<span class="peter">彼得副指揮官：</span>主要是這幾天風向的關係，抵達火麒麟港的時間會比預期晚4~5小時左右。從火麒麟港離開後再過2天就會到黑鷹港，到時會有比較充裕的時間可以進行完整的船舶服務。',
'<span class="you">你：</span>如果我沒記錯，黑鷹港的船舶服務案一直是由喬治執行長他們公司標到的吧！        <br><span class="peter">彼得副指揮官：</span>是的。',
'<span class="you">你：</span>長官，我很好奇他們公司報價特別高，為何還能標到這麼多案子？        <br><span class="peter">彼得副指揮官：</span>他們公司得標的金額蠻低的。        <br><span class="you">你：</span>這樣聽起來不太合理。',
'<span class="peter">彼得副指揮官：</span>我也不清楚上面跟承包廠商之間的合約是怎麼規定的，總之你把份內的工作做好就對了。        <br><span class="you">你：</span>是的，長官。',
'<span class="peter">彼得副指揮官：</span>喬治執行長說訂好了餐廳，待會一起吃晚餐。        <br><span class="you">你：</span>謝謝長官，但艦艇明天一早要出發，我想先回艦艇上做準備。',
'<span class="peter">彼得副指揮官：</span>我也想回去啊，但執行長的盛情難卻，我是不好意思辜負人家的好意，我們就一起吃完飯再走吧！'];

var text9=['<span class="john">約翰指揮官：</span>請進。威廉，找我有事嗎？        <br><span class="you">你：</span>跟長官報告，過幾天艦艇會停靠在火麒麟港幾個小時，進行簡單的船舶服務。',
'<span class="john">約翰指揮官：</span>大概會執行哪些項目？        <br><span class="you">你：</span>因為逆風導致靠港時間延遲，彼得副指揮官指示抵達火麒麟港僅先補充燃料至5分滿，其餘項目到黑鷹港再處理。',
'<span class="john">約翰指揮官：</span>你評估這樣做是可行的嗎？        <br><span class="you">你：</span>可行。我已巡視過目前艦艇上的廢棄物數量並確認待修繕項目，可等停靠黑鷹港時再一併請海霸天公司處理。',
'<span class="john">約翰指揮官：</span>很好，就按照這個方式去進行。        <br><span class="you">你：</span>謝謝長官，我待會就趕緊把工作交辦下去。'];

var text10=['<span class="george">喬治執行長：</span>這次到黑鷹港的船舶服務很順利。        <br><span class="john">約翰指揮官：</span>我有跟副指揮官以及底下的士官長交代，把原本要在火麒麟港進行的船舶服務移到黑鷹港來做。',
'<span class="george">喬治執行長：</span>我知道信得過你，不然怎麼會贊助你們全家去滑雪、看極光、搭郵輪，還有看動物大遷徙。',
'<span class="john">約翰指揮官：</span>我辦事你放心，艦艇接下來的停靠點是在黑梟港。        <br><span class="george">喬治執行長：</span>那就好。這邊說話不是很方便，我擔心隔牆有耳，下次再約！'];

var text11=['<span class="peter">彼得副指揮官：</span>請進。        <br><span class="you">你：</span>報告長官，我覺得今天海霸天公司開的發票有點奇怪。        <br><span class="peter">彼得副指揮官：</span>怎麼說？',
'<span class="you">你：</span>價格太高了！        <br><span class="peter">彼得副指揮官：</span>會不會是最近油價比較高的關係？        <br><span class="you">你：</span>但價格高了三倍。',
'<span class="peter">彼得副指揮官：</span>你有和對口的服務人員確認發票金額嗎？        <br><span class="you">你：</span>有，他說公司的報價一直是這個價格。',
'<span class="peter">彼得副指揮官：</span>這樣啊，剛好下週軍艦停靠寶石國之後，我會和海霸天公司的執行長喬治在私人派對上見個面，到時正好可以問他發票的事情。對了，威廉你也一起來吧！'];

var text12=['<span class="you">你：</span>長官好。        <br><span class="peter">彼得副指揮官：</span>剛才甲板上發出了很大的聲響，是什麼狀況？        <br><span class="you">你：</span>報告長官，附近的補給船因大浪撞上了艦艇。',
'<span class="peter">彼得副指揮官：</span>雙方船艦或人員是否有損傷？        <br><span class="you">你：</span>補給船和我方左舷甲板有輕微擦撞，無重大損傷，人員也都一切平安。',
'<span class="peter">彼得副指揮官：</span>那就好，這幾天海上風浪大，艦艇上陸續發生了一些小狀況，再請多加留意。        <br><span class="you">你：</span>是的，長官。',
'<span class="peter">彼得副指揮官：</span>對了，上次艦艇停靠在寶石國，海霸天的執行長喬治在當地舉辦了一個餐會，凡是參加的人都可以拿到一盒雪茄。我記得你有在抽，這個就送你了。'];

var text13=['<span class="you">你：</span>長官，您找我嗎？        <br><span class="peter">彼得副指揮官：</span>對，請坐。威廉，算一算你在黃金艦隊上服役已經7年多了。        <br><span class="you">你：</span>是的。',
'<span class="peter">彼得副指揮官：</span>和幾家提供船舶服務的供應商也都合作得很有默契了吧！        <br><span class="you">你：</span>都還不錯。',
'<span class="peter">彼得副指揮官：</span>接下來艦艇會停靠在火麒麟港對嗎？        <br><span class="you">你：</span>是的。        <br><span class="peter">彼得副指揮官：</span>預計會進行哪些船舶服務？',
'<span class="you">你：</span>燃油補給、存糧補給、廢棄物處理，以及左舷甲板的修繕。        <br><span class="peter">彼得副指揮官：</span>了解。目前航行進度有維持在原定計畫上嗎？',
'<span class="you">你：</span>報告長官，因為這幾天風向的關係，抵達火麒麟港的時間會比預期晚4~5小時左右。        <br><span class="peter">彼得副指揮官：</span>延遲這麼久的時間！',
'<span class="peter">彼得副指揮官：</span>我的建議是，先在火麒麟港稍微加個油，等到2天後抵達黑鷹港，時間比較充裕時，再來做完整的船舶服務。        <br><span class="you">你：</span>報告長官，以往不會突然更改表定要進行的船舶服務項目。',
'<span class="peter">彼得副指揮官：</span>這次是例外，因為艦艇沒有在原定時間抵達火麒麟港，所以才調整排程。',
'<span class="you">你：</span>長官如果您是擔心延遲的問題，我已經跟火麒麟港的藍泰洋公司確認過要進行的船舶服務，他們表示會儘快完成相關工作，不會耽誤到後續的航程。',
'<span class="peter">彼得副指揮官：</span>要是藍泰洋為了趕時間隨便做做，不是更糟糕嗎？我認為應該把大部分的船舶服務移到黑鷹港再進行。',
'<span class="you">你：</span>長官請恕我直言，根據我過往的經驗，因為天候導致靠港時間延遲屬正常情形，不需改變原定在火麒麟港的船舶服務計畫。更何況黑鷹港負責服務的海霸天公司，報價有比較高的狀況。',
'<span class="peter">彼得副指揮官：</span>但海霸天的船舶服務品質一向維持得很好，價格高也是合理。        <br><span class="you">你：</span>基本上各家廠商提供的船舶服務品質差異不大。',
'<span class="peter">彼得副指揮官：</span>總而言之，長官們已針對靠港進行船舶服務的問題充分討論過了，就按照這個新的計畫去執行。到火麒麟港只需要先補充燃料到5分滿，接著抵達黑鷹港再完成其他相關船舶服務。'];

var text14=['<span class="you">你：</span>長官，您找我嗎？        <br><span class="peter">彼得副指揮官：</span>對，威廉請坐。目前艦艇的航行進度似乎比原定計畫落後了。',
'<span class="you">你：</span>是的，長官。到達火麒麟港的時間會比預計晚4~5小時左右。        <br><span class="peter">彼得副指揮官：</span>原定要在火麒麟港進行的船舶服務有哪些？',
'<span class="you">你：</span>燃油補給、存糧補給、廢棄物處理，以及左舷甲板的修繕。        <br><span class="peter">彼得副指揮官：</span>我建議先在火麒麟港稍微加個油就好，其他項目等2天後抵達黑鷹港再來做完整的船舶服務。',
'<span class="you">你：</span>報告長官，因天候因素導致靠港時間延遲是常態，不需要突然更改在原定港口要進行的船舶服務項目。',
'<span class="peter">彼得副指揮官：</span>這是例外狀況。主要有考慮到艦艇接連會停靠兩個港口，更改原定要在火麒麟港的服務項目，並不會影響艦艇運作的安全性；再說了，我們跟海霸天公司關係那麼好，到黑鷹港後請他們加快進度也比較沒有問題。',
'<span class="you">你：</span>我知道了，那我趕緊去跟兩家廠商確認靠港後的船舶服務項目。        <br><span class="peter">彼得副指揮官：</span>感謝，辛苦了。'];

var text15=['<span class="hiba">海霸天公司員工：</span>長官好，和您確認一下今天要進行的服務項目，包括：燃油補給、存糧補給、廢棄物處理，以及左舷甲板修繕，對嗎？',
'<span class="you">你：</span>是，沒錯。        <br><span class="hiba">海霸天公司員工：</span>好的，我們會儘快處理。',
'<span class="john">約翰指揮官：</span>喬治，又見面了！        <br><span class="george">喬治執行長：</span>約翰，你很守信用喔，果然把大部分的船舶服務留在我們港口進行。',
'<span class="john">約翰指揮官：</span>我說過會儘量幫你喬，我說到做到。        <br><span class="george">喬治執行長：</span>對了，那個藍泰洋的資料……        <br><span class="john">約翰指揮官：</span>有有有，寄給你了。我們去吃飯吧，邊吃邊談。'];

var text16=['<span class="george">喬治執行長：</span>彼得，稀客稀客，什麼風把你吹來了？        <br><span class="you">你：</span>執行長好，我是威廉。',
'<span class="george">喬治執行長：</span>威廉你好，以後歡迎常來坐坐。        <br><span class="peter">彼得副指揮官：</span>喬治，這是你要的資料，幫你送過來。',
'<span class="george">喬治執行長：</span>這個……藍泰洋公司做船舶服務的報價也太低了吧！是要做到什麼時候才能賺到錢啊~',
'<span class="peter">彼得副指揮官：</span>這是機密資料，可別外流出去。對了，接下來我們艦隊會停靠黑梟港，也跟你說一下。        <br><span class="george">喬治執行長：</span>就是要多停靠在我們家服務的港口，這樣就對了！',
'<span class="george">喬治執行長：</span>話說這次發票請款應該不會再有什麼問題了吧？        <br><span class="peter">彼得副指揮官：</span>當然，威廉就是負責檢核還有驗收船舶服務的人啊！',
'<span class="george">喬治執行長：</span>威廉，以後你就是自己人了，有什麼需要儘管提出來，我都會幫忙。        <br><span class="peter">彼得副指揮官：</span>還不趕快謝謝執行長。'];

var end=['<span class="red">接受廠商賄賂</span>或<span class="red">洩密</span>可能觸及刑責，執行各項工作時，請務必秉持知法守法的精神。',
'<span class="red">接受廠商賄賂</span>或<span class="red">洩密</span>可能觸及刑責，然而共犯共利者如果願意轉當證人，揭發貪腐罪狀，根據《貪污治罪條例》第8條及「揭弊者保護法」草案規定，<span class="red">共犯揭弊可減刑或免刑</span>。<br><br>另外，「揭弊者保護法」草案規定，受理揭弊機關及其承辦調查或稽核人員，對於揭弊者之身分應予保密，<span class="red">若身分曝光而被報復，依法可提起救濟，並請求損害賠償</span>。',
'避免接受廠商的好處與避答敏感問題，可維護自身之清廉形象，明哲保身。然而得知機關內發生舞弊情事<span class="red">有告發的義務</span>，以杜絕後患。',
'得知機關內有舞弊情事<span class="red">勇於揭弊</span>，並避免接受廠商的好處與避答敏感問題，以維護自身及機關之清廉形象。',
'得知機關內有舞弊情事<span class="red">勇於揭弊</span>，並避免接受廠商的好處與避答敏感問題，以維護自身及機關之清廉形象。根據「揭弊者保護法」草案規定，受理揭弊機關及其承辦調查或稽核人員，對於揭弊者之身分應予保密，<span class="red">若身分曝光而被報復，依法可提起救濟，並請求損害賠償</span>。'];





