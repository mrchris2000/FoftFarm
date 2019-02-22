DECLARE SUB sewgrain (grain, farm, impg)
DECLARE SUB buycows (money, cows, price)
DECLARE SUB sellcows (money, cows, price)
DECLARE SUB Calculate (impg, grain, money, price, gprice, cows, Dairy, farm, milk)
DECLARE SUB init (cows, money, price, gprice, grain, milk, Dairy, farm)
DECLARE SUB buygrain (money, grain, gprice)
DECLARE SUB sellgrain (money, grain)
DECLARE SUB impdairy (Dairy, money)
DECLARE SUB impfarm (farm, money)
DECLARE SUB hbull (money, cows)
DECLARE SUB buymenu (impg, grain, money, price, gprice, cows, Dairy, farm, milk)
DECLARE SUB disply (impg, grain, money, price, gprice, cows, Dairy, farm, milk)
DECLARE SUB impmenu (impg, grain, money, price, gprice, cows, Dairy, farm, milk)
DECLARE SUB lifemenu (impg, grain, money, price, gprice, cows, Dairy, farm, milk)

init cows, money, price, gprice, grain, milk, Dairy, farm

DO
disply impg, grain, money, price, gprice, cows, Dairy, farm, milk

PRINT
PRINT "**********************"
PRINT "*    1)Buy or Sell   *"
PRINT "*    2)Improvements  *"
PRINT "*    3)Farm life!    *"
PRINT "*    10)quit!        *"
PRINT "**********************"
INPUT b
CLS
disply impg, grain, money, price, gprice, cows, Dairy, farm, milk
IF b = 1 THEN buymenu impg, grain, money, price, gprice, cows, Dairy, farm, milk
IF b = 2 THEN impmenu impg, grain, money, price, gprice, cows, Dairy, farm, milk
IF b = 3 THEN lifemenu impg, grain, money, price, gprice, cows, Dairy, farm, milk
IF b = 10 THEN PRINT "Goodbye!": END
Calculate impg, grain, money, price, gprice, cows, Dairy, farm, milk
LOOP
END

SUB buycows (money, cows, price)
INPUT "Buy how many cows"; c
cows = cows + c
temp = price
z = c
tp = temp
IF cows > 500 THEN money = money - price * c: GOTO 12
FOR num = z TO 0 STEP -1
temp = temp - RND(1)
IF temp < .5 * tp THEN temp = .5 * tp
price = price + RND(1)
NEXT num
12 money = money - temp * c
END SUB

SUB buygrain (money, grain, gprice)
INPUT "Buy how many tons"; c
grain = grain + c
money = money - c * gprice
gprice = gprice + RND(1) * c
END SUB

SUB buymenu (impg, grain, money, price, gprice, cows, Dairy, farm, milk)
PRINT
PRINT "**********************"
PRINT "*    1)Buy Cows      *"
PRINT "*    2)Sell Cows     *"
PRINT "*    3)Buy Grain     *"
PRINT "*    4)Sell grain    *"
PRINT "**********************"
INPUT b
IF b = 1 THEN buycows money, cows, price
IF b = 2 THEN sellcows money, cows, price
IF b = 3 THEN buygrain money, grain, gprice
IF b = 4 THEN sellgrain money, grain
IF b = 10 THEN END
END SUB

SUB Calculate (impg, grain, money, price, gprice, cows, Dairy, farm, milk)
milk = cows * RND(1) * Dairy
money = money + milk

IF impg > grain THEN impg = grain
grain = grain + impg * (farm / 50)
grain = grain - cows / 2
IF grain < 0 THEN cows = cows - INT(RND(1) * -grain / 2): grain = 0
grain = grain - (grain * (RND(1) * .01))

IF price < 50 THEN price = price + RND(1) * ((50 - price) / 4)
IF price > 50 THEN price = price - RND(1) * ((price - 50) / 4)

IF gprice < 10 THEN gprice = gprice + RND(1) * ((10 - gprice) / 8)
IF gprice > 10 THEN gprice = gprice - RND(1) * (gprice - 10)

price = price + RND(1) * 4
price = price - RND(1) * 4

b$ = "n"

IF money < 0 THEN money = money + money * .1
IF money > 0 THEN money = money - money * .001

IF money < -10000000 THEN PRINT "You are broke. The bank confiscate the rest of your farm as payment.": cows = 0: money = 200: grain = 0: farm = 0: Dairy = 0: impg = 0: FOR delay = 1 TO 100000: NEXT delay


IF cows > 100 AND INT(RND(1) * 30) = 15 THEN PRINT "Bse Alert": price = price - RND(1) * 100: cows = cows - INT(RND(1) * (cows) / 2)
IF grain > 100000 AND INT(RND(1) * 200) = 15 THEN PRINT "Rats Eat Grain!": grain = grain - INT(RND(1) * grain)
IF grain > 1000000 AND INT(RND(1) * 5000) = 250 THEN PRINT "Grain infected": grain = 0
IF money > 1000000 AND INT(RND(1) * 300) = 15 THEN PRINT "You are robbed": money = money - INT(RND(1) * (money / 2))
IF money < 0 AND INT(RND(1) * 300) = 15 THEN PRINT "Bank threatens disclosing mortgage! You bribe them with cows!!!": cows = cows - INT(RND(1) * (cows / 6))
IF money >= 900000000 THEN PRINT "Major theft reported": money = 9999999
IF cows > farm * 10000 THEN PRINT "You are arrested for overcrowding your animals. Fine:$1000000": money = money - 1000000
IF grain > farm * 10000000 THEN PRINT "Your grain and farmland is confiscated because it is stored below eec standards. P.S. Sell all cows!": farm = 1: grain = 0
IF cows > 2000 AND INT(RND(1) * 200) = 15 THEN PRINT "Cows Ill! Vets bill.": money = money - cows * 10
IF price < 0 THEN price = .1
IF farm > 0 AND INT(RND(1) * 3000) = 75 THEN PRINT "Farmland deteriates": farm = farm - 1:
IF Dairy > 0 AND INT(RND(1) * 3000) = 75 THEN PRINT "Dairy damaged by high winds": Dairy = Dairy - 1:
CLS
END SUB

SUB disply (impg, grain, money, price, gprice, cows, Dairy, farm, milk)
LOCATE 3, 18
PRINT milk
LOCATE 1, 1
PRINT "Cows cost $"; price
PRINT "Grain costs $"; gprice
PRINT "Last Milk Sales $"
PRINT "Grain planted:"; impg
PRINT "COWS:"; cows
PRINT "Grain:"; grain
PRINT "Money $"; money
PRINT "Dairy"; Dairy
PRINT "Farm "; farm
END SUB

SUB hbull (money, cows)
IF cows > 20 AND money > 200 THEN INPUT "Hire a Bull($10 per cow(min $200))"; b$
IF b$ = "y" OR b$ = "Y" THEN money = money - 10 * cows: cows = cows + INT(RND(1) * cows / 2)
END SUB

SUB impdairy (Dairy, money)
dry = 10 ^ (Dairy / 2)
IF dry > 1000000 THEN dry = 1000000
PRINT "Improve Dairy $"; dry
INPUT b$
IF b$ = "y" THEN Dairy = Dairy + 1: money = money - dry
END SUB

SUB impfarm (farm, money)
IF farm >= 7 THEN PRINT "Farm is best available!": RETURN
PRINT "Improve Farm $"; 10 ^ farm
INPUT b$
IF b$ = "y" THEN farm = farm + 1: money = money - (10 ^ (farm - 1))
END SUB

SUB impmenu (impg, grain, money, price, gprice, cows, Dairy, farm, milk)
PRINT
PRINT "**********************"
PRINT "*    1)Improve Dairy *"
PRINT "*    2)Improve Farm  *"
PRINT "**********************"
INPUT b
IF b = 1 THEN impdairy Dairy, money
IF b = 2 THEN impfarm farm, money
END SUB

SUB init (cows, money, price, gprice, grain, milk, Dairy, farm)
CLS
impg = 0
cows = 0: money = 2000: price = 50: gprice = RND(1) * 40 + 20
grain = 0: milk = 0: Dairy = 0: farm = 0
END SUB

SUB lifemenu (impg, grain, money, price, gprice, cows, Dairy, farm, milk)
PRINT
PRINT "**********************"
PRINT "*    1)Hire Bull     *"
PRINT "*    2)Grow grain    *"
PRINT "**********************"
INPUT b
IF b = 1 THEN hbull money, cows
IF b = 2 THEN sewgrain grain, farm, impg
END SUB

SUB sellcows (money, cows, price)
20 INPUT "Sell how many cows"; c
IF c > cows THEN PRINT cows; "-"; c; "<0": GOTO 20
cows = cows - c
temp = price
z = c
FOR num = z TO 0 STEP -1
temp = temp - RND(1) * 5
IF temp < price - 10 THEN temp = price - 4
price = price - RND(1) * 5
IF price < 5 THEN price = 5
NEXT num
money = money + temp * c

END SUB

SUB sellgrain (money, grain)
INPUT "Sell how many tons(Sale price $5)"; c
IF c > grain THEN c = grain
grain = grain - c
money = money + c * 5
gprice = gprice - RND(1) * c
IF gprice < 1 THEN gprice = 1
END SUB

SUB sewgrain (grain, farm, impg)
max = grain
IF grain > 10000 + (farm * 1000) THEN max = 10000 + (farm * 1000)
PRINT "Sow how much grain? (Max "; max; " Tons)"
INPUT impg
IF impg > max THEN impg = max: PRINT "Count please!!"
END SUB

