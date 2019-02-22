#!/usr/bin/perl
#FoFTFarm
#PERL edition :-)

$cows = 0;
$grain = 0;
$money = 2000;

$milk=0;
$cow_price=50;
$grain_price=10;

$dairy=0;
$farm=0;

$grain_planted=0;

while (1)
{
	print "*********************\n";
	print "*   1)Buy or Sell   *\n";
	print "*   2)Improvements  *\n";
	print "*   3)Farm life     *\n";
	print "*   9)Quit          *\n";
	print "*********************\n\n";

	&display_status;

	$choice = <>;
	chomp $choice;

	if ($choice eq "1")
	{
		&shop_menu;
	}
	elsif ($choice eq "2")
	{
		&improvement_menu;
	}
	elsif ($choice eq "3")
	{
		&life_menu;
	}
	elsif ($choice eq "9")
	{
		die "Goodbye!\n";
	}

	&calculate;
}

sub display_status
{
	print "Cows cost      :\$$cow_price\n";
	print "Grain costs    :\$$grain_price\n";
	print "Last Milk sales:\$$milk\n";
	print "Grain planted  : $grain_planted\n";
	print "Cows owned     : $cows\n";
	print "Grain owned    : $grain\n";
	print "Money          : $money\n";
	print "Dairy          : $dairy\n";
	print "Farm           : $farm\n\n";
}

sub shop_menu
{
	print "**********************\n";
	print "*    1)Buy Cows      *\n";
	print "*    2)Sell Cows     *\n";
	print "*    3)Buy Grain     *\n";
	print "*    4)Sell grain    *\n";
	print "**********************\n";

	$choice = <>;
	chomp $choice;

	if ($choice eq "1")
	{
		&buy_cows;
	}
	elsif ($choice eq "2")
	{
		&sell_cows;
	}
	elsif ($choice eq "3")
	{
		&buy_grain;
	}
	elsif ($choice eq "4")
	{
		&sell_grain;
	}
}

sub improvement_menu
{
	print "********************\n";
	print "*  1)Improve Dairy *\n";
	print "*  2)Improve Farm  *\n";
	print "********************\n";

	$choice = <>;
	chomp $choice;

	if ($choice eq "1")
	{
		&improve_dairy;
	}
	elsif ($choice eq "2")
	{
		&improve_farm;
	}
}

sub life_menu
{
	print "**********************\n";
	print "*    1)Hire Bull     *\n";
	print "*    2)Sow Grain     *\n";
	print "**********************\n";

	$choice = <>;
	chomp $choice;

	if ($choice eq "1")
	{
		&hire_bull;
	}
	elsif ($choice eq "2")
	{
		&sow_grain;
	}
}

sub buy_cows
{
	print "Buy how many cows? ";

	$choice = <>;
	chomp $choice;
	print "\n";

	$cows+=$choice;
	$cow_price_min = $cow_price/2;
	$cow_purchase_price = $cow_price;
	
	for ($i=$choice;$i>0;$i--)
	{
		$cow_price+= rand 1;
		$cow_purchase_price-= rand 1;
	}

	if ($cow_price<$cow_price_min)
	{
		$cow_price=$cow_price_min;
	}

	$money-=$cow_purchase_price*$choice;
}

sub sell_cows
{
	print "Sell how many cows? ";

	$choice = <>;
	chomp $choice;
	print "\n";
	
	if ($choice>$cows) 
	{
		print "Which cows were you planning on selling?!\n";
	}

	$cows-=$choice;

	$cow_sale_price = $cow_price;
	
	for ($i=$choice;$i>0;$i--)
	{
		$cow_price-= rand 5;
		$cow_sale_price-= rand 5;
	}

	if ($cow_price<5)
	{
		$cow_price=5;
	}

	if ($cow_sale_price<($cow_price-5))
	{
		$cow_sale_price = $cow_price - 2;
	}

	$money+=$cow_sale_price*$choice;
}

sub buy_grain
{
	print "Buy how many tonnes? ";

	$choice = <>;
	chomp $choice;
	print "\n";

	$grain+=$choice;
	$money-=$choice*$grain_price;
	$grain_price+=rand $choice;
}

sub sell_grain
{
	print "Sell how many tonnes (sale price \$5)? ";

	$choice = <>;
	chomp $choice;
	print "\n";

	if ($choice>$grain)
	{
		print "Urm, you don't own that much!\n";
	}

	$grain-=$choice;
	$money+=$choice*5;
	$grain_price-=rand $choice;
	if ($grain_price<1)
	{
		$grain_price=1;
	}
}

sub improve_dairy
{
	$dairy_cost = 10 **($dairy/2);
	
	if ($dairy_cost>1000000)
	{
		$dairy_cost = 1000000;
	}

	print "Dairy improvement will cost \$$dairy_cost. Improve it? ";

	$choice = <>;
	chomp $choice;
	print "\n";

	if ($choice =~ /[yY].*/)
	{
		$dairy++;
		$money-=$dairy_cost;
	}
}

sub improve_farm
{
	if ($farm>=7)
	{
		print "Farm is best availble!\n";
		return;
	}

	$farm_cost = 10**$farm;

	print "Improving farm will cost \$$farm_cost. Improve it? ";

	$choice = <>;
	chomp $choice;
	print "\n";

	if ($choice =~ /[yY].*/)
	{
		$money-=$farm_cost;
		$farm++;
	}
}

sub hire_bull
{
	if ($cows>20 and $money>200)
	{
		print "Hire a Bull (\$10 per cow(min \$200))? ";

		$choice = <>;
		chomp $choice;
		print "\n";

		if ($choice =~ /[yY].*/)
		{
			if ($cows>=20)
			{
				$money-=10*$cows;
			}
			else
			{
				$money-=200;
			}

			$cows +=int(rand ($cows/2)); 
		}
	}
}

sub sow_grain
{
	$max_allowed = 10000 + $farm*1000;
	if ($grain < $max_allowed)
	{
		$max_allowed = $grain;	
	}

	print "Sow how much grain? (Max: $max_allowed tonnes) ";
	
	$choice = <>;
	chomp $choice;
	print "\n";

	if ($choice>$max_allowed)
	{
		$choice = $max_allowed;
		print "Overplanting leads to degradation in farm quality\n";
		$farm -=1;
	}
	$grain_planted = $choice;
}

sub calculate
{
#money from milk sales
$milk = $cows*$dairy*rand(1);
$money += $milk;

#how much grain is grown
$grain += $grain_planted * ($farm/50);

#feed the cows (on grain!!!)
$grain -= $cows/2;

#if not enough grain then let some cows die
if ($grain<0)
{
	$cows -= int(rand($cows/2));
	$grain = 0;
}

#even cow prices
if ($cow_price < 50)
{
	$cow_price += rand(1) * ((50 - $cow_price) / 4);
}
else
{
	$cow_price -= rand(1) * (($cow_price - 50) / 4);
}

#adjust grain prices slightly
if ($grain_price <10)
{
	$grain_price += rand(1)*((10 - $grain_price) / 8)
}
else
{
	$grain_price -= rand(1) * ($grain_price - 10)
}

#adjust cow prices randomly
$cow_price += rand(4) - rand(4);

#interest rates
if ($money<0)
{
	$money+=$money*0.1;
}
{
        $money+=$money*.001;
}

#special cases

#bankrupt
if ($money< -100000)
{
	print "You are broke. The bank confiscate the rest of your farm as payment.\n";
	$cows = 0;
	$money = 200;
	$grain = 0;
	$farm = 0; 
	$dairy = 0; 
	$grain_planted = 0;
}

#BSE
if ($cows>100 and (15 == int(rand(30))))
{
	print "Bse Alert\n";
	$cow_price -= rand(100);
	$cows -= int(rand($cows/2));
}

#rats eat grain:-)
if ($grain > 1000000000 and (int(rand(20)) == 15))
{
	print "Rats Eat Grain!\n";
	$grain -= int(rand($grain));
}

#grain infection
if ($grain > 100000 and (int(rand(500)) == 250))
{
	print "Grain infected\n";
	$grain = 0;
}

#basic robbery
if ($money>100000 and (int(rand(30)) == 15))
{
	print "You are robbed\n";
	$money -= int(rand(money / 2));
}

#disclosure of mortgage
if ($money < 0 and (int(rand(30)) == 15))
{
	print "Bank threatens disclosing mortgage! You bribe them with cows!!!\n";
	$cows -= int(rand(cows / 6));
}

#huge robbery
if ($money >= 100000000 and (int(rand(10)) == 4))
{
	print "Major theft reported";
	$money -= $money*rand(1);
}

#overcrowding animals
if ($cows > ($farm * 10000))
{
	print "You are arrested for overcrowding your animals. Fine:\$1000000\n";
	$money -= 1000000;
}

#too much grain
if ($grain > ($farm * 1000000))
{
	print "Your grain and farmland is confiscated because it is stored below EU standards. P.S. Sell all cows!\n";
	$farm = 1;
	$grain = 0;
	$dairy = 0;
}

#ill cows
if ($cows > 2000 and (int(rand(20)) == 15))
{
	print "Cows Ill! Vets bill.\n";
	$money -= $cows * 10;
}

#farmland deteriates
if ($farm > 0 and (int(rand(300)) == 75))
{
	print "Farmland deteriates\n";
	$farm--;
}

#dairy blows down
if ($dairy > 0 and (int(rand(300)) == 75))
{
	print "Dairy damaged by high winds\n";
	$dairy--;
}

#cow price correction
if ($cow_price < 0) {$cow_price = .1};
}
